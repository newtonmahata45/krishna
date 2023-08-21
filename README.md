# lithium
# Question 3

length =  int(input("Enter no. of elements in the list: "))
nums = []

for index in range(0,length):
    nums.append(int(input()))

maxnum = float('-inf')
minnum = float('inf')
smax = maxnum
smin = minnum

for i in nums:
    if( i > maxnum):
        smax = maxnum
        maxnum =i
    elif(i > smax):
        smax =i
    if( i < minnum):
        smin = minnum
        minnum = i
    elif(i < smin):
        smin =i

print("The second largest is: ", smax)
print("The second smallest is: ", smin)
