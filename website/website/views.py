from django.shortcuts import render

def index(request):
    return render(request, "index.html")

def bubblesort(request):
    return render(request, "bubblesort.html")
