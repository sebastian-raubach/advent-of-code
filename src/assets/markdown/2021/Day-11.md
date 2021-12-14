You enter a large cavern full of rare bioluminescent [dumbo octopuses](https://www.youtube.com/watch?v=eih-VSaS2g0! They seem to not like the Christmas lights on your submarine, so you turn them off for now.

There are 100 octopuses arranged neatly in a 10 by 10 grid. Each octopus slowly gains **energy** over time and **flashes** brightly for a moment when its energy is full. Although your lights are off, maybe you could navigate through the cave without disturbing the octopuses if you could predict when the flashes of light will happen.

Each octopus has an **energy level** - your submarine can remotely measure the energy level of each octopus (your puzzle input). For example:

```
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526
```

The energy level of each octopus is a value between `0` and `9`. Here, the top-left octopus has an energy level of `5`, the bottom-right one has an energy level of `6`, and so on.

You can model the energy levels and flashes of light in **steps**. During a single step, the following occurs:

- First, the energy level of each octopus increases by `1`.
- Then, any octopus with an energy level greater than `9` **flashes**. This increases the energy level of all adjacent octopuses by 1, including octopuses that are diagonally adjacent. If this causes an octopus to have an energy level greater than `9`, it also **flashes**. This process continues as long as new octopuses keep having their energy level increased beyond `9`. (An octopus can only flash **at most once per step**.)
- Finally, any octopus that flashed during this step has its energy level set to `0`, as it used all of its energy to flash.

Adjacent flashes can cause an octopus to flash on a step even if it begins that step with very little energy. Consider the middle octopus with `1` energy in this situation:

<pre>
Before any steps:
11111
19991
19191
19991
11111

After step 1:
34543
4<b>000</b>4
5<b>000</b>5
4<b>000</b>4
34543

After step 2:
45654
51115
61116
51115
45654
</pre>

An octopus is **highlighted** when it flashed during the given step.

Here is how the larger example above progresses:

<pre>
Before any steps:
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526

After step 1:
6594254334
3856965822
6375667284
7252447257
7468496589
5278635756
3287952832
7993992245
5957959665
6394862637

After step 2:
88<b>0</b>7476555
5<b>0</b>89<b>0</b>87<b>0</b>54
85978896<b>0</b>8
84857696<b>00</b>
87<b>00</b>9<b>0</b>88<b>00</b>
66<b>000</b>88989
68<b>0000</b>5943
<b>000000</b>7456
9<b>000000</b>876
87<b>0000</b>6848

After step 3:
<b>00</b>5<b>0</b>9<b>00</b>866
85<b>00</b>8<b>00</b>575
99<b>000000</b>39
97<b>000000</b>41
9935<b>0</b>8<b>00</b>63
77123<b>00000</b>
791125<b>000</b>9
221113<b>0000</b>
<b>0</b>421125<b>000</b>
<b>00</b>21119<b>000</b>

After step 4:
2263<b>0</b>31977
<b>0</b>923<b>0</b>31697
<b>00</b>3222115<b>0</b>
<b>00</b>41111163
<b>00</b>76191174
<b>00</b>53411122
<b>00</b>4236112<b>0</b>
5532241122
1532247211
113223<b>0</b>211

After step 5:
4484144<b>000</b>
2<b>0</b>44144<b>000</b>
2253333493
1152333274
11873<b>0</b>3285
1164633233
1153472231
6643352233
2643358322
2243341322

After step 6:
5595255111
3155255222
33644446<b>0</b>5
2263444496
2298414396
2275744344
2264583342
7754463344
3754469433
3354452433

After step 7:
67<b>0</b>7366222
4377366333
4475555827
34966557<b>0</b>9
35<b>00</b>6256<b>0</b>9
35<b>0</b>9955566
3486694453
8865585555
486558<b>0</b>644
4465574644

After step 8:
7818477333
5488477444
5697666949
46<b>0</b>876683<b>0</b>
473494673<b>0</b>
474<b>00</b>97688
69<b>0000</b>7564
<b>000000</b>9666
8<b>00000</b>4755
68<b>0000</b>7755

After step 9:
9<b>0</b>6<b>0000</b>644
78<b>00000</b>976
69<b>000000</b>8<b>0</b>
584<b>00000</b>82
5858<b>0000</b>93
69624<b>00000</b>
8<b>0</b>2125<b>000</b>9
222113<b>000</b>9
9111128<b>0</b>97
7911119976

After step 10:
<b>0</b>481112976
<b>00</b>31112<b>00</b>9
<b>00</b>411125<b>0</b>4
<b>00</b>811114<b>0</b>6
<b>00</b>991113<b>0</b>6
<b>00</b>93511233
<b>0</b>44236113<b>0</b>
553225235<b>0</b>
<b>0</b>53225<b>0</b>6<b>00</b>
<b>00</b>3224<b>0000</b>
</pre>

After step 10, there have been a total of `204` flashes. Fast forwarding, here is the same configuration every 10 steps:

After step 20:
3936556452
56865568<b>0</b>6
449655569<b>0</b>
444865558<b>0</b>
445686557<b>0</b>
568<b>00</b>86577
7<b>00000</b>9896
<b>0000000</b>344
6<b>000000</b>364
46<b>0000</b>9543

After step 30:
<b>0</b>643334118
4253334611
3374333458
2225333337
2229333338
2276733333
2754574565
5544458511
9444447111
7944446119

After step 40:
6211111981
<b>0</b>421111119
<b>00</b>42111115
<b>000</b>3111115
<b>000</b>3111116
<b>00</b>65611111
<b>0</b>532351111
3322234597
2222222976
2222222762

After step 50:
9655556447
48655568<b>0</b>5
448655569<b>0</b>
445865558<b>0</b>
457486557<b>0</b>
57<b>000</b>86566
6<b>00000</b>9887
8<b>000000</b>533
68<b>00000</b>633
568<b>0000</b>538

After step 60:
25333342<b>00</b>
274333464<b>0</b>
2264333458
2225333337
2225333338
2287833333
3854573455
1854458611
1175447111
1115446111

After step 70:
8211111164
<b>0</b>421111166
<b>00</b>42111114
<b>000</b>4211115
<b>0000</b>211116
<b>00</b>65611111
<b>0</b>532351111
7322235117
5722223475
4572222754

After step 80:
1755555697
59655556<b>0</b>9
448655568<b>0</b>
445865558<b>0</b>
457<b>0</b>86557<b>0</b>
57<b>000</b>86566
7<b>00000</b>8666
<b>0000000</b>99<b>0</b>
<b>0000000</b>8<b>00</b>
<b>0000000000</b>

After step 90:
7433333522
2643333522
2264333458
2226433337
2222433338
2287833333
2854573333
4854458333
3387779333
3333333333

After step 100:
<b>0</b>397666866
<b>0</b>749766918
<b>00</b>53976933
<b>000</b>4297822
<b>000</b>4229892
<b>00</b>53222877
<b>0</b>532222966
9322228966
7922286866
6789998766

After 100 steps, there have been a total of **`1656`** flashes.

Given the starting energy levels of the dumbo octopuses in your cavern, simulate 100 steps. **How many total flashes are there after 100 steps?**

[comment]: <> (PART 2)

It seems like the individual flashes aren't bright enough to navigate. However, you might have a better option: the flashes seem to be **synchronizing**!

In the example above, the first time all octopuses flash simultaneously is step **`195`**:

<pre>
After step 193:
5877777777
8877777777
7777777777
7777777777
7777777777
7777777777
7777777777
7777777777
7777777777
7777777777

After step 194:
6988888888
9988888888
8888888888
8888888888
8888888888
8888888888
8888888888
8888888888
8888888888
8888888888

After step 195:
<b>0000000000</b>
<b>0000000000</b>
<b>0000000000</b>
<b>0000000000</b>
<b>0000000000</b>
<b>0000000000</b>
<b>0000000000</b>
<b>0000000000</b>
<b>0000000000</b>
<b>0000000000</b>
</pre>

If you can calculate the exact moments when the octopuses will all flash simultaneously, you should be able to navigate through the cavern. **What is the first step during which all octopuses flash?**