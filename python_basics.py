#==================================> Question 1 <=================================================

string = input("Write a sentence: ")
ans = ""
word = ""
for char in string:
    if char == " ":
        ans += word + " "
        word = ""
    else:
        word = char + word;

ans += word
print(ans)

#==================================> Question 2 <=================================================


import random

length =  int(input("Enter the length of the password minimum 4: "))

password = ""

string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghigklmnopqrstuvwxyz0123456789!@#$%^&*()/?+"
obj = {
    "digit" : "0123456789",
    "small" : "abcdefghigklmnopqrstuvwxyz",
    "capital" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "symbol" : "!@#$%^&*()/?+"
} 
keys = ["digit", "small","capital","symbol"]

for i in range(0,length):
    if(i<4):
        key = random.choice(keys)
        keys.remove(key)
        password += random.choice(obj[key])
    else:
        password += random.choice(string)
    
print("Password generated: ",password)

#==================================> Question 3 <=================================================

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

#==================================> Question 4 <=================================================

fnum =  int(input("Enter first number: "))
operator =  input("Enter the operator ('+','-','*','/'): ")
snum =  int(input("Enter second number: "))

if(operator == "+"):
    print(f"The sum of {fnum} and {snum} is: ", fnum + snum )
elif(operator == "-"):
    print(f"The substration of {fnum} and {snum} is: ", fnum - snum )
elif(operator == "*"):
    print(f"The multiplication of {fnum} and {snum} is: ", fnum * snum )
elif(operator == "/"):
    print(f"The division of {fnum} and {snum} is: ", fnum / snum )
else:
    print("Wrong Operator!")

#==================================> Question 5 <=================================================

age =  int(input("Enter your age: "))
if(age < 18 and age > 0):
    print("You are minor.")
elif(age >= 18 and age < 60):
    print("You are adult.")
elif(age >= 60 and age < 140):
    print("You are senior.")
else: print("Worng age")

#==================================> Question 6 <=================================================
# Question 6
blance = 1000
pin = "2451"
inputPin = input("Enter your pin: ")

if(inputPin == pin):
    while True:
        num = int(input("To check blance enter 1 \nTo deposit enter 2 \nTo withdraw money enter 3\n Enter 0 to exit\n"))
        if num==0:
            print("Thank you")
            break
        elif num == 1:
            print("Your blance is: ", blance)

        elif num == 2:
            add = int(input("Enter the amout you want to deposit: "))
            blance +=add
            print("Your updated blance is: ", blance)
        elif num == 3:
            withdraw = int(input("Enter the amout you want to withdraw: "))
            if withdraw > blance:
                print("Insufficient Blance! available blance is: ", blance)
            else:
                blance -= withdraw
                print("Your updated blance is: ",blance)
else: print("Incorrect pin")

#==================================> Question 7 <=================================================

num1 = 0
num2 = 1
length = int(input("Enter length: "))

for i in range(length):
    temp = num2
    print(temp)
    num2 = num1 + num2
    num1 = temp


#==================================> Question 8 <=================================================
def permute(data, i, length):
    if (i == 1):
        print(" ".join(data))
    else:
        for j in range(i,length):
            data[i], data[j] = data[j], data[i]
            permute(data,i+1,length)
            data[i],data[j]= data[j],data[i]
string = input("Write your string: ")

n = len(string)
arr = list(string)
permute(arr,0,n)
        
#==================================> Question 9 <=================================================

import random
length = 100
n = random.randint(1,length)
guess = int(input(f"Guess a number in between 1 and {length}: "))
atm = 1
while n!= guess:
    atm += 1
    if guess < n:
        print("Too low!!")
        guess = int(input("Enter number again: "))
    elif guess > n:
        print("Too high!!")
        guess = int(input("Enter number again: "))

print(f"You guessed it right!!\n It took {atm} attempts.")
