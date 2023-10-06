
function visualisierung() {
    const inputElement = document.getElementById('inputNumbers');
    const inputData = inputElement.value.split(',').map(Number);
    console.log(inputData);
    visualizeData(inputData);
}

function visualizeData(data) {
    const chartElement = document.getElementById('chart');
    chartElement.innerHTML = '';

    const maxValue = Math.max(...data);

    for (const value of data) {
        const column = document.createElement('div');
        column.style.height = (value / maxValue) * 100 + '%';
        column.classList.add('bar');
        chartElement.appendChild(column);
    }
}

async function bubbleSort(arr, delay = 20) {
    const inputData = [...arr];
    const n = inputData.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            visualizeData(inputData);

            if (inputData[j] > inputData[j + 1]) {
                const temp = inputData[j];
                inputData[j] = inputData[j + 1];
                inputData[j + 1] = temp;

                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }

    return inputData;
}

function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    const sortedLeft = quickSort(left);
    const sortedRight = quickSort(right);

    const sortedData = [...sortedLeft, pivot, ...sortedRight];
    visualizeData(sortedData);

    return sortedData;
}

function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    const sortedLeft = mergeSort(left);
    const sortedRight = mergeSort(right);

    const sortedData = merge(sortedLeft, sortedRight);
    visualizeData(sortedData);

    return sortedData;
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    console.log("stelle 3", result);

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
        console.log("stelle 1", result);

    }
    console.log("stelle 2", result);

    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

async function insertionSort(arr, delay = 0) {
    const inputData = [...arr];
    const n = inputData.length;

    for (let i = 1; i < n; i++) {
        const key = inputData[i];
        let j = i - 1;

        while (j >= 0 && inputData[j] > key) {
            inputData[j + 1] = inputData[j];
            j--;
        }

        inputData[j + 1] = key;
        visualizeData(inputData);
        await new Promise(resolve => setTimeout(resolve, delay));
    }

    return inputData;
}

async function heapSort(arr, delay = 0) {
    const inputData = [...arr];
    const n = inputData.length;


    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(inputData, n, i, delay);
    }


    for (let i = n - 1; i >= 0; i--) {
        const temp = inputData[0];
        inputData[0] = inputData[i];
        inputData[i] = temp;
        visualizeData(inputData);
        await new Promise(resolve => setTimeout(resolve, delay));

        await heapify(inputData, i, 0, delay);
    }

    return inputData;
}

async function heapify(arr, n, i, delay) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    if (largest !== i) {
        const swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;
        visualizeData(arr);
        await new Promise(resolve => setTimeout(resolve, delay));

        await heapify(arr, n, largest, delay);
    }
}

function sortStepByStep() {
    const selectedMethod = document.getElementById('sortMethod').value;
    const inputElement = document.getElementById('inputNumbers');
    const chartElement = document.getElementById('chart');
    chartElement.innerHTML = '';

    const inputData = inputElement.value.split(',').map(Number);

    if (!inputData.every(Number.isInteger)) {
        alert('Bitte geben Sie eine gültige Zahlenfolge ein.');
        return;
    }

    let sortedData;

    switch (selectedMethod) {
        case 'quickSort':
            sortedData = quickSort(inputData);
            break;
        case 'mergeSort':
            sortedData = mergeSort(inputData);
            break;
        case 'heapSort':
            heapSort(inputData, 5);

            break;
        case 'insertionSort':
            insertionSort(inputData, 5);

            break;
        case 'bubbleSort':
            sortedData = bubbleSort(inputData, 3);
            break;
        default:
            alert('Ungültige Sortiermethode ausgewählt.');
            return;
    }

    visualizeData(sortedData);
}
