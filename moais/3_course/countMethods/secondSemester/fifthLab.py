import matplotlib as mpl
import matplotlib.pyplot as plt
from tkinter import *
from tkinter import ttk
import tkinter
import math

#Эйлер неявный, явный Аддамсон 3-го, неявный Тейлор второго порядка
def func(x):
    return math.e**(x**3/3-29/40*x**2+0.51*x) #идеальное решение

def f(x,y):
    return 50*y*(x-0.6)*(x-0.85)

def Runge(yn,xn,h,f):
    k1 = f(xn,yn)
    k2 = f(xn + h/2,yn + h/2*k1)
    k3 = f(xn + h/2,yn + h/2*k2)
    k4 = f(xn + h,yn + h*k3)
    return yn + h/6*(k1 + 2*k2 + 2*k3 + k4)

def Adams(yn,xn,yn_1,xn_1,yn_2,xn_2,h,f):
    return yn + h/12*(23*f(xn,yn)-16*f(xn_1,yn_1)+5*f(xn_2,yn_2))

def Euler(yn, xn1, h):
    return yn/(1-50*h*(xn1-0.6)*(xn1-0.85))

def Tailor(yn,xn,h,f,g):
    return 0

def butt():
    if(entry1.get() != ""):
        n = int(entry1.get())
        methodWithStepAndStep(n,1/n)
    elif (entry2.get() != ""):
        h = float(entry2.get())
        methodWithStepAndStep(1/h,h)
    else:
        default()

def methodWithStepAndStep(n,h):
    n = int(n)
    x=[0]
    y=[0.1]
    fig, ax = plt.subplots() 
    for i in range(n):
        x.append(x[i]+h)
        y.append(Euler(func(x[i]),x[i+1],h))
    ax.plot(x,y,label="Euler")
    ax.legend()

    x=[0]
    y=[0.1]
    for i in range(10000):
        x.append(x[i]+1/10000)
        y.append(func(x[i]))
    ax.plot(x,y, label="Exact")
    ax.legend()
    
    x=[0,h, 2*h]
    y=[0.1,Runge(func(0.1),0,h,f)]
    y.append(Runge(func(x[1]), x[1], h, f))
    for i in range(2,n):
        x.append(x[i]+h)
        y.append(Adams(func(x[i]),x[i],y[i-1],x[i-1],y[i-2],x[i-2],h,f))
    ax.plot(x,y, label="Adams")
    ax.legend()
    

    x=[0]
    y=[0.1]
    for i in range(n):
        x.append(x[i]+h)
        y.append(Tailor(y[i],x[i],h,f,1))
    ax.plot(x,y,label="Tailor")
    ax.legend()
    
    plt.show()
def default():
    methodWithStepAndStep(10,1/10)
    return
n=0
h=0.1

root = Tk()
frm = ttk.Frame(root, padding=10)
frm.grid()
ttk.Label(frm, text="Лучшая программа атвичаю").grid(column=0, row=0)
entry1 = ttk.Entry(frm)
entry1.grid(column=0, row=1)
ttk.Label(frm, text="Введите количество шагов").grid(column=1,row=1)
entry2 = ttk.Entry(frm)
entry2.grid(column=0, row=2)
ttk.Label(frm, text="Введите длину шага").grid(column=1,row=2)
ttk.Button(frm, text="Запустить", command=butt).grid(column=0, row=3)
root.mainloop()

#fig, ax = plt.subplots()  # Create a figure containing a single axes.
#ax.plot([1, 2, 3, 4], [1, 4, 2, 3])
#ax.plot([1,2,3,4],[1,4,9,16])
#plt.show()
