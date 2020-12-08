<template>
  <Day :day="8" :solutions="solutions" :taskInput="taskInput" @input-changed="onInputChanged">
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
      taskInput: 'acc -7\nacc +2\nacc +20\nacc +14\njmp +191\nacc +47\nnop +339\nacc +49\njmp +104\njmp +629\njmp +374\nacc +24\njmp +220\nnop +474\nacc +25\njmp +340\nacc +16\nacc +3\nacc +41\njmp +566\njmp +296\nacc +15\njmp +452\nacc +21\njmp +129\nacc +10\nacc -8\nacc +39\njmp +396\nacc +5\nacc -4\nacc +0\njmp +496\nnop +181\nacc +48\nacc +7\njmp +1\njmp +370\nacc +16\nacc -18\nacc +47\nacc +48\njmp +99\nnop +17\nacc +25\nacc -15\njmp +285\nnop +545\nnop +147\nnop +479\nacc -4\njmp +386\nacc +36\nacc -12\njmp +50\nacc +37\nnop +133\nacc +11\nacc +20\njmp +32\njmp +1\nnop +210\nacc -15\nacc -6\njmp +446\nacc +25\nacc +1\nacc +17\nacc -4\njmp +355\nacc -4\njmp +292\nacc +16\nacc +44\nacc +26\njmp +157\nacc -18\nacc +15\nacc -8\nacc -3\njmp +46\nacc +30\nacc +16\njmp -7\nacc +34\njmp +515\nacc +11\nacc -8\nacc -9\nacc -3\njmp +548\njmp +278\nnop +332\nacc -19\nacc +49\njmp +536\nacc -9\nacc +46\njmp +124\nacc +41\nacc +47\nacc -5\nacc -13\njmp +41\nnop +178\nacc +12\nacc +45\njmp +461\nacc +37\nacc +12\nacc +38\njmp -68\nacc -6\nnop +494\nacc -9\njmp -63\nacc +42\nacc +16\nacc +30\njmp +70\nacc +13\njmp +1\nacc -18\njmp +528\nacc +48\njmp +493\nnop +402\njmp +381\nacc -8\njmp +372\nacc +20\nacc +25\njmp +425\nacc -10\njmp +510\njmp +439\nnop +78\nacc +36\nacc +7\nnop +281\njmp +504\njmp -108\nacc +40\njmp -122\nacc +23\nacc -2\nacc +7\njmp +370\nacc +25\nnop -5\nacc +33\nacc +37\njmp +70\nacc -6\nnop +336\njmp +34\njmp +1\nacc -18\njmp +473\njmp +1\nacc +20\nacc +4\nacc +25\njmp -87\nacc -12\nacc +47\nacc +49\njmp +323\njmp +1\njmp +1\njmp +167\nacc -10\nacc +45\njmp +355\nacc +32\nacc +38\nacc +2\njmp -93\nacc +8\nacc +20\nacc +4\nacc -1\njmp +108\nnop +164\nacc +41\njmp +440\nacc -16\nacc +47\njmp +355\nacc -13\nacc +29\nacc +50\njmp -101\nacc -8\njmp +316\nacc +27\nacc +31\nnop -29\njmp +1\njmp +250\nacc +12\nacc -13\njmp +73\njmp +72\nacc +36\nacc +44\njmp +1\njmp -33\nacc -18\nacc +16\nacc -8\nacc +6\njmp +104\njmp +295\nacc +10\nnop -80\njmp +74\nacc -13\njmp +1\nacc +22\nacc +50\njmp +280\njmp +265\njmp +278\nacc +46\nacc -14\nacc -17\njmp -19\nacc +39\nacc +31\nacc -11\njmp +400\njmp +80\nacc +0\nacc +27\nnop +209\njmp -184\nacc +12\nacc +21\nacc +23\njmp +352\nacc +29\njmp -5\nacc +15\nacc +7\njmp +6\nacc +31\nacc -5\nnop +83\nacc +31\njmp -239\nacc +8\nacc -2\nacc +49\nacc -12\njmp -52\nacc -15\nacc -14\njmp +126\njmp +385\nacc +30\nacc -5\nacc +6\njmp -187\nacc +39\nacc +40\nacc +0\nacc +6\njmp +24\nacc +20\njmp +131\njmp -127\nacc +8\nacc +30\njmp -265\nacc -2\njmp -265\nacc +22\nacc -19\nacc -9\nnop +10\njmp +148\nacc -14\nacc +38\nacc +50\nacc -7\njmp +197\nacc +11\nacc +22\njmp +201\njmp -155\njmp -32\nacc +48\nnop -50\njmp -99\njmp -5\nacc +11\nacc -18\njmp -186\nacc +6\nacc +43\njmp +159\njmp +249\nacc +44\nacc +29\nnop +313\nacc +23\njmp +311\njmp +152\nacc +0\nacc +41\njmp -251\njmp +102\nnop -17\nnop +176\njmp +40\nacc +28\njmp -21\nacc -4\nacc -10\nacc -19\nacc -15\njmp +23\nnop +144\nacc +9\nacc +18\njmp +141\nacc -19\nacc -10\nacc +48\njmp -7\nacc +46\nacc -9\njmp -174\nacc +30\nacc +30\njmp -201\nacc +34\nacc +24\nacc +37\nacc +44\njmp -158\nacc +4\nacc +39\njmp -52\njmp -329\njmp +68\nacc +25\nnop -105\nacc -15\nacc +34\njmp -6\njmp +1\nacc +1\njmp +163\nnop -285\nacc +8\nacc +48\njmp +143\nacc -3\nnop -269\nacc -16\njmp -310\nacc -5\njmp -304\nacc +45\nnop -231\njmp +1\njmp +245\nnop -243\njmp +187\nacc -6\nacc +7\nacc +17\nacc +6\njmp -111\nacc +24\nacc -10\nacc +21\njmp -97\njmp +1\nacc -12\nacc +10\njmp +127\nacc +0\njmp -211\nacc -11\nacc +36\nacc +45\nacc -19\njmp -182\njmp -366\nacc +38\nacc -11\nacc +32\njmp -260\nacc +6\nacc +31\njmp +3\nacc +5\njmp +101\njmp -64\nacc +48\nacc +5\nnop +40\nacc -13\njmp +95\nnop +76\nacc +44\nacc +43\nacc +43\njmp +196\nacc +34\njmp +161\nacc +5\nacc +45\nacc +7\njmp +20\nacc +13\njmp -127\nacc +5\nacc +18\njmp -239\njmp -76\nnop +214\njmp -284\nacc +10\nacc -8\njmp -81\nacc +48\nacc -3\njmp -55\nnop -288\nacc +37\nacc +1\nacc -12\njmp +1\nnop +91\nacc +20\nacc +18\njmp +4\nacc -7\nacc -10\njmp -229\nnop -230\nnop +45\nacc +37\njmp +127\njmp +69\njmp -153\nacc -15\nacc -19\nacc +32\njmp -33\nnop +164\nacc +32\njmp -133\nacc +20\nacc -8\njmp +8\nacc -11\nnop +82\nacc +7\nacc +40\njmp +79\nacc +0\njmp +159\nacc +4\nacc -8\nacc +20\nnop +143\njmp -351\nacc -7\njmp +78\nacc +0\nacc +4\njmp +20\njmp -3\nacc +2\nacc +23\njmp -256\nacc +33\njmp -473\nacc +29\nacc -13\njmp +77\njmp +158\nacc -16\njmp -10\njmp -181\njmp -135\nnop -95\nacc +46\nacc +39\nacc -3\njmp -94\njmp -67\nacc +49\nnop -78\nnop -9\njmp +107\nacc -19\nacc -1\nacc +0\nacc -4\njmp -189\nacc +11\njmp -106\njmp -200\njmp +122\nacc +8\nacc +48\nacc +15\nacc +0\njmp -493\nacc +13\njmp -8\nacc +36\nacc -10\njmp +1\nacc +9\njmp +7\njmp +85\nacc +22\nacc -8\nnop -124\njmp -517\njmp -338\nacc +39\nnop -438\nacc -11\njmp +69\nacc +8\nacc +34\nacc +34\nacc -9\njmp -205\nnop -528\njmp -495\nacc +47\nacc +40\nacc +30\njmp -328\nacc -2\nacc +41\njmp -475\nacc +42\nacc +48\nacc +2\nacc +7\njmp -415\nnop -249\nacc -3\njmp +65\nacc +23\nnop -4\njmp -254\nacc -12\nacc +22\nacc +27\njmp -176\njmp -408\nacc -15\nacc +14\nacc +30\nacc +0\njmp -363\njmp -426\nacc +38\nnop -425\njmp -440\njmp +1\nacc +22\njmp -63\njmp -406\nnop -445\nacc -5\nacc +34\nnop -425\njmp +65\nacc +33\njmp -91\nacc -12\njmp +1\njmp -541\nnop -489\njmp -490\nacc +20\nacc +20\nacc +38\nacc -18\njmp -548\nacc +43\nacc -7\njmp -351\nacc -9\nacc +50\nacc +1\nnop -587\njmp -230\njmp +1\nnop +43\njmp -65\nacc +31\nacc +5\nacc +1\njmp -105\nnop -477\nacc +21\nnop -92\njmp -263\nacc +28\njmp -265\njmp -311\nacc +2\nacc +23\nacc +50\njmp -4\nacc +42\nacc +42\nacc +31\njmp -167\nacc +49\nacc +46\njmp -73\nnop -135\nacc +43\njmp -236\nacc -14\nacc -3\njmp -406\nacc +2\nacc -3\nacc +47\njmp -420\nacc -8\nacc +18\njmp -604\njmp -218\nacc +37\nacc -16\nnop -278\nacc -15\njmp -214\nacc -6\nacc +18\nacc +7\nacc +0\njmp -252\nacc +14\njmp -266\nacc +27\nacc -16\nnop -533\nnop -534\njmp +1',
      solutions: {
        partOne: null,
        partTwo: null
      },
      operations: [],
      operands: {
        // Accumulators increase the acc and move to the next position
        acc: (value, acc, pos) => { return { acc: acc + value, pos: pos + 1 } },
        // No operations just move to the next position
        nop: (value, acc, pos) => { return { acc: acc, pos: pos + 1 } },
        // Jumps just move the current position to the value
        jmp: (value, acc, pos) => { return { acc: acc, pos: pos + value } }
      }
    }
  },
  methods: {
    onInputChanged: function (input) {
      this.operations = input.map(i => {
        const parts = i.split(' ')
        // Remember the operator and the value as a number
        return {
          op: parts[0],
          value: +parts[1]
        }
      })

      this.solvePartOne()
      this.solvePartTwo()
    },
    calculateSolution: function (localOperations) {
      let accumulator = 0
      let position = 0
      const visitedPositions = {}

      // Loop while we haven't terminated yet
      while (true) {
        // If we've either hit an infinite loop (repeated index) or we reached the end, return
        if (position === localOperations.length || visitedPositions[position]) {
          return {
            accumulator: accumulator,
            position: position
          }
        }

        // Get the current operator
        const operator = localOperations[position]
        // Mark the index as visited
        visitedPositions[position] = true
        // Get the new configuration
        const next = this.operands[operator.op](operator.value, accumulator, position)

        // Adjust the configuration
        position = next.pos
        accumulator = next.acc
      }
    },
    solvePartOne: function () {
      this.solutions.partOne = this.calculateSolution(this.operations).accumulator
    },
    solvePartTwo: function () {
      // Loop through all positions
      for (let index = 0; index < this.operations.length; index++) {
        // Get the operation
        const i = this.operations[index]

        // If it's a nop or a jmp
        if (i.op === 'nop' || i.op === 'jmp') {
          // Copy the whole input
          const tempInput = JSON.parse(JSON.stringify(this.operations))
          // Then swap the current position
          tempInput[index].op = i.op === 'nop' ? 'jmp' : 'nop'

          // Calculate the result using part one
          const result = this.calculateSolution(tempInput)

          // If this configuration has reached the end, it's no longer an infinite loop
          if (result.position === tempInput.length) {
            // Set the result and terminate
            this.solutions.partTwo = result.accumulator
            return
          }
        }
      }
    }
  }
}
</script>

<style>

</style>
