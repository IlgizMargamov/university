from math import log2, log, exp

def frange(start, stop=None, step=None):
    # if set start=0.0 and step = 1.0 if not specified
    start = float(start)
    if stop == None:
        stop = start + 0.0
        start = 0.0
    if step == None:
        step = 1.0

    #print("start = ", start, "stop = ", stop, "step = ", step)

    count = 0
    while True:
        temp = float(start + count * step)
        if step > 0 and temp >= stop:
            break
        elif step < 0 and temp <= stop:
            break
        yield temp
        count += 1

# n - количество итераций, h - шаг, (x, y) - начальная точка
def left_rectangle(a=0, b=1, h = 0.1):
    x=a
    y=0
    for i in frange(a,b,h):
        y += h * f(x)
        x += h
    return h, y # решение

def f(x):
    return log(1+  x**2) 

def df(x):
    return 2*x/(x*x+1)

def f_i(h, i):
    return f(h*i)

def df_i(h, i):
    return df(h*i)

def sum1(n, a,b,h):
    s = 0
    x=a
    for i in frange(a, b,h):
        if i==0: s+=f(x)/2
        else: s += f(x)
        x+=h
    s+=f(x)/2
    return s

def Euler(a=0, b=1, h=0.1):
    x=a
    y=0
    n = int(1/h)
    s1 = sum1(n, a,b,h)
    #for i in frange(a,b,h):
    y= h*s1+h*h/12*(df_i(h, 0)-df_i(h, n))
        #y+=(h / 2) * (f(a) + f(b)) + h*s1 + h*h / 12 * (df_i(h,i) - df_i(h,i))
    x+=h
    
    return x,y

def getC(n):
    p=n+1
    return 2**p/(2**p - 1) 

print("LeftRectangle")
print(left_rectangle(a=0, b=1,h=0.1))
print(left_rectangle(a=0, b=1,h=0.05))
print(left_rectangle(a=0, b=1,h=0.025))
print(left_rectangle(a=0, b=1,h=0.0125))
#print(left_rectangle(a=0, b=1,h=0.01))
#print(left_rectangle(a=0, b=1,h=0.00001))

print("Euler")
print(Euler(a=0,b=1, h=0.1))
print(Euler(a=0,b=1, h=0.05))
print(Euler(a=0,b=1, h=0.025))
print(Euler(a=0,b=1, h=0.0125))
#print(Euler(a=0,b=1, h=0.01))
#print(Euler(a=0,b=1, h=0.00001))

print("RungeRectangle")
h1,y1 = left_rectangle(0,1,0.1)
h2,y2 = left_rectangle(0,1,0.05)
h3,y3 = left_rectangle(0,1,0.025)
h4,y4 = left_rectangle(0,1,0.0125)

c0=getC(0)
rL1 =c0*(y2-y1)
rL2 =c0*(y3-y2)
rL3 =c0*(y4-y3)
print(y1+rL1)
print(y2+rL2)
print(y3+rL3)

print("RungeRectangleError")
print(rL1)
print(rL2)
print(rL3)

print("RungeEuler")
c1=getC(1)
h1,y1=Euler(0,1,0.1)
h2,y2=Euler(0,1,0.05)
h3,y3=Euler(0,1,0.025)
h4,y4=Euler(0,1,0.0125)

rl1 =c1*(y2-y1)
rl2 =c1*(y3-y2)
rl3 =c1*(y4-y3)
print(y1+rl1)
print(y2+rl2)
print(y3+rl3)

print("RungeEulerError")
print(rl1)
print(rl2)
print(rl3)