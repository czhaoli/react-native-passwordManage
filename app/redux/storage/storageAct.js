import storage from '../../storage';

export function getList(){
  return (dispatch) => {
    storage.load({
      key: 'datas',
    }).then(list=>{
      dispatch({type: 'list', data: list})
    }).catch(e=>{
      console.log('get Datas error', e);
      if (e.name === 'NotFoundError') {
        storage.save({
          key: 'datas',
          data: [],
        })
      }
    });
  };
}

export function setList(list, succ, fail) {
  return (dispatch)=>{
    storage.save({
      key: 'datas',
      data: list,
    }).then(r=>{
      dispatch(getList());
      succ();
    }).catch(e=>{
      fail();
    });
  }
}