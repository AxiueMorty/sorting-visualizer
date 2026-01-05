function generateElement() {
  return Math.ceil(100 * Math.random())
}

function generateArray() {
  let arr = [];
  for(let i=0; i<5; i++) {
    arr.push(generateElement())
  }
  return arr;
}

function generateContainer() {
  return document.createElement('div');
}

function fillArrContainer(htmlElement, arr) {
  htmlElement.innerHTML = '';
  arr.forEach(ele => htmlElement.innerHTML += `<span>${ele}</span>`)
}

function isOrdered(intFormer, intLatter) {
  return intFormer <= intLatter;
}

function swapElements(intsArr, index) {
  if (!isOrdered(intsArr[index], intsArr[index+1])) {
    const indexIntOriginal = intsArr[index];
    intsArr[index] = intsArr[index + 1];
    intsArr[index + 1] = indexIntOriginal;
  }
}

function highlightCurrentEls(htmlElement, index) {
  const allSpans = Array.from(htmlElement.children);
  allSpans.forEach(span => span.style.border = '');
  
  if (allSpans[index] && allSpans[index + 1]) {
    const highlightStyle = 'border: 2px dashed red;';
    allSpans[index].style.cssText = highlightStyle;
    allSpans[index + 1].style.cssText = highlightStyle;
  }
}

function isArrSorted(arr) {
  for (let i=0; i<arr.length-1; i++) {
    if (arr[i] > arr[i+1]) return false;
  }
  return true;
}


const arrContainer = document.getElementById('array-container');
const startingArr = document.getElementById('starting-array');
const generateBtn = document.getElementById('generate-btn');
const sortBtn = document.getElementById('sort-btn');


sortBtn.classList.add('hidden');


generateBtn.addEventListener('click', () => {
  sortBtn.classList.remove('hidden');
  sortBtn.disabled = false;

  const arrDivs = arrContainer.querySelectorAll('div');
  Array.from(arrDivs).forEach(div => {
    if (div.id !== "starting-array") {
      div.remove();
    }
  })
  startingArr.innerHTML = '';

  const arr = generateArray();
  fillArrContainer(startingArr, arr);
})


sortBtn.addEventListener('click', () => {
  sortBtn.classList.add('hidden');
  sortBtn.disabled = true;
  highlightCurrentEls(startingArr, 0);
   
  const spans = startingArr.querySelectorAll('span');
  const arr = [];
  Array.from(spans).forEach(span => {
    arr.push(Number(span.textContent));
  });
  
  swapElements(arr, 0);
  for (let i=1; i<arr.length-1; i++) {
    const stepDiv = generateContainer();
    fillArrContainer(stepDiv, arr);
    highlightCurrentEls(stepDiv, i);
    arrContainer.appendChild(stepDiv);
    swapElements(arr, i);
  }
  
  while (!isArrSorted(arr)) {
    for (let i=0; i<arr.length-1; i++) {
      const stepDiv = generateContainer();
      fillArrContainer(stepDiv, arr);
      highlightCurrentEls(stepDiv, i);
      arrContainer.appendChild(stepDiv);
      swapElements(arr, i);
    }
  }

  for (let i=0; i<arr.length-1; i++) {
    const stepDiv = generateContainer();
    fillArrContainer(stepDiv, arr);
    highlightCurrentEls(stepDiv, i);
    arrContainer.appendChild(stepDiv);
    swapElements(arr, i);
  }

  const sortedDiv = generateContainer();
  fillArrContainer(sortedDiv, arr);
  sortedDiv.style.border = '4px solid darkgreen';
  arrContainer.appendChild(sortedDiv);
})

