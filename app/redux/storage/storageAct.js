import storage from '../../storage';

function loadStorage() {
  return storage.load({
    key: 'datas',
  });
}
function saveStorage(list) {
  return storage.save({
    key: 'datas',
    data: list,
  })
}
export function getList(){
  return (dispatch) => {
    loadStorage().then(list=>{
      dispatch({type: 'list', data: list})
    }).catch(e=>{
      console.log('get Datas error', e);
      if (e.name === 'NotFoundError') {
        saveStorage([]);
      }
    });
  };
}

export function setList(list, succ, fail) {
  return (dispatch)=>{
    saveStorage(list).then(r=>{
      dispatch(getList());
      succ();
    }).catch(e=>{
      fail();
    });
  }
}

function getExp(str) {
  const arr = str.split('');
  const indexArr = gcnk(arr);
  const regArr = index2exp(arr, indexArr);
  return regArr;
}
function index2exp(arr, indexArr, regArr = [], index = 0) {
  const item = indexArr[index];
  if (!item) {
    return regArr;
  }
  let regstr = '';
  for (let i = 0; i < item.length; i++) {
    regstr += arr[item[i]] + '.*';
  }
  const reg = new RegExp(regstr, 'ig');
  regArr.push(reg);
  return index2exp(arr, indexArr, regArr, index + 1);
}
function gcnk(arr) {
  let temp = [];
  const lastIndex = arr.length - 1;
  // for (let i = 0; i < arr.length; i++) {
  //   const arr = initarr(i + 1);
  //   temp = getlengthArr(temp, lastIndex, arr);
  // }
  temp = getlengthArr(temp, lastIndex, initarr(arr.length));
  return temp;
}
function initarr(length) {
  const arr = [];
  for (var i = 0; i < length; i++) {
    arr.push(i);
  }
  return arr;
}
function getlengthArr(arr = [], lastIndex, indexArr = [0, 1, 2]) {
  arr.push(indexArr);
  const indexArrtemp = move(lastIndex, indexArr);
  if (indexArrtemp) {
    return getlengthArr(arr, lastIndex, indexArrtemp);
  }
  return arr;
}
function move(lastIndex, arrOrigin, arrlast = []) {
  const arr = [...arrOrigin];
  const isAdd = addone(lastIndex, arr, arrlast);
  if (isAdd) {
    return isAdd;
  }
  if (arr.length == 0) {
    return null;
  }
  arr.pop();
  arrlast.push(1);
  return move(lastIndex - 1, arr, arrlast);

}
function addone(lastIndex, arrOrigin, arrlast){
  if (!arrOrigin.length) {
    return null;
  }
  const arr = [...arrOrigin];
  let last = arr.pop();
  if (lastIndex === last) {
    return null;
  } else {
    const length = arrlast.length + 1;
    for (let i = 0; i < length; i++) {
      arr.push(last + i + 1);
    }
    return arr;
  }
}

// function gcnk(lastIndex, arr) {
//   const last = arr.pop();
//   if (lastIndex === last) {
//     return [...arr, last];
//   }
//   return gcnk(lastIndex, ++last);
// }
//
// function ank(n, k) {
//   return cheng(n) / cheng(n - k);
// }
// function cnk(n, k) {
//   return cheng(n) / (cheng(k) * cheng(n - k));
// }
// function cheng(n) {
//   if (n === 1) {
//     return 1;
//   }
//   if (n === 0) {
//     return 1;
//   }
//   return n * cheng(n-1);
// }
function testReg(item, regArr, index = 0) {
  const reg = regArr[index];
  if (!reg) {
    return false;
  }
  const {name, remarks} = item;
  const regName = reg.test(name);
  const regRemarks = reg.test(remarks);
  if (regName || regRemarks) {
    return true;
  } else {
    return testReg(item, regArr, index + 1);
  }
}
function testIncludes(item, value) {
  const {name, remarks} = item;
  const regName = name.includes(value);
  const regRemarks = remarks.includes(value);
  return regName || regRemarks;
}
function searchReg(list, value) {
  value = value.replace(/\s/g, '');
  const regArr = getExp(value);
  return list.filter(item => {
    return testReg(item, regArr);
  });
}
function searchIncludes(list, value) {
  return list.filter(item => {
    return testIncludes(item, value);
  });
}
let searchTimeout;
export function searchList(value) {
  return (dispatch) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    searchTimeout = setTimeout(()=>{
      loadStorage().then(list=>{
        if (!value) {
          dispatch({type: 'list', data: list});
          return;
        }
        let data = searchReg(list, value);
        dispatch({type: 'list', data})
      });
    }, 0);

  };
}










