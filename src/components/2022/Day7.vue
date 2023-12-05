<template>
  <Day :day="7" :year="2022" :solutions="solutions" @input-changed="onInputChanged">
    <template v-slot:partOne>
      <pre class="day-7-code border">
<code v-html="dirStructureHtml" />
      </pre>
    </template>
  </Day>
</template>

<script>
import Day from '@/components/Day'

export default {
  components: {
    Day
  },
  data: function () {
    return {
      solutions: {
        partOne: null,
        partTwo: null
      },
      dirStructureHtml: null
    }
  },
  methods: {
    onInputChanged: function (input) {
      // Define the root directory
      const root = {
        name: '/',
        parent: null,
        children: {},
        files: {},
        size: 0,
        totalSize: 0
      }

      // Remember current directory
      let currentDir = root

      // Iterate through all lines
      input.forEach(i => {
        // Split them
        const parts = i.split(' ')
        if (i.startsWith('$')) {
          // If we're dealing with an instruction
          if (parts[1] === 'cd') {
            // And it's a 'change directory'
            if (parts[2] === '/') {
              // And it's root, set current directory to root
              currentDir = root
            } else if (parts[2] === '..') {
              // If it's '..', go up one level
              currentDir = currentDir.parent
            } else {
              // Else, we need to go deeper
              if (currentDir.children[parts[2]]) {
                // Switch to existing sub-directory
                currentDir = currentDir.children[parts[2]]
              } else {
                // Create a new sub-directory
                const newDir = {
                  name: parts[2],
                  parent: currentDir,
                  children: {},
                  files: {},
                  size: 0,
                  totalSize: 0
                }

                currentDir.children[parts[2]] = newDir
                currentDir = newDir
              }
            }
          } else if (parts[1] === 'ls') {
            // Do nothing here, we handle the next lines in other places
          }
        } else if (i.startsWith('dir')) {
          // If we found a new directory through a 'ls'
          const dirName = parts[1]

          if (!currentDir.children[dirName]) {
            // Add a new one if it doesn't exist
            const newDir = {
              name: dirName,
              parent: currentDir,
              children: {},
              files: {},
              size: 0,
              totalSize: 0
            }

            currentDir.children[dirName] = newDir
          }
        } else {
          // Else it's a file, remember it's name and size
          const fileSize = +parts[0]
          const fileName = parts[1]

          if (!currentDir.files[fileName]) {
            currentDir.files[fileName] = fileSize
            currentDir.size += fileSize
          }
        }
      })

      // Traverse the whole tree structure to calculate the total directory sizes from individual sizes
      this.traverseSum(root)

      // Solution for part one is counting the directories with at most size 100000
      this.solutions.partOne = this.countDirs(root, 100000)

      // Get all directories in a flat array structure
      const flattened = this.flatten(root)
      // Sort them by size increasing
      flattened.sort((a, b) => a.totalSize - b.totalSize)

      // Determine how much space we need to find
      const target = 30000000 - (70000000 - root.totalSize)

      // Iterate through all directories
      for (const dir of flattened) {
        // Until we find one that gives us enough space
        if (dir.totalSize >= target) {
          // This is the solution
          this.solutions.partTwo = dir.totalSize
          break
        }
      }

      this.dirStructureHtml = this.print(root)
    },
    /**
     * Flattens the given directory into an array of all recursively contained directories
     */
    flatten: function (dir) {
      const dirs = [dir]

      Object.keys(dir.children).forEach(d => {
        dirs.push(...this.flatten(dir.children[d]))
      })

      return dirs
    },
    /**
     * Counts the directories recursively that have a totalSize below the limit.
     */
    countDirs: function (dir, limit) {
      let sum = dir.totalSize <= limit ? dir.totalSize : 0

      Object.keys(dir.children).forEach(d => {
        sum += this.countDirs(dir.children[d], limit)
      })

      return sum
    },
    /**
     * Traverses the file system to calculate total sums per directory
     */
    traverseSum: function (dir) {
      let sum = 0

      Object.keys(dir.children).forEach(d => {
        sum += this.traverseSum(dir.children[d])
      })
      Object.keys(dir.files).forEach(f => {
        sum += dir.files[f]
      })

      dir.totalSize = sum
      return sum
    },
    print: function (dir, indent = 0) {
      let result = `<br/>${' '.repeat(indent)}- <span class="day-7-directory">${dir.name} (dir)</span>`
      Object.keys(dir.children).forEach(d => {
        result += this.print(dir.children[d], indent + 2)
      })
      Object.keys(dir.files).forEach(f => {
        result += `<br/>${' '.repeat(indent + 2)}- <span class="day-7-file">${f} (file, size=${dir.files[f]})</span>`
      })
      return result
    }
  }
}
</script>

<style>
.day-7-code {
  background-color: #2c3e50;
  color: #7f8c8d;
  max-height: 100vh;
}
.day-7-directory {
  background-color:#27ae60;
  color: #2c3e50;
}
.day-7-file {
  background-color: #2980b9;
  color: #2c3e50;
}
</style>
