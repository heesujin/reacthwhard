import { db, auth } from "../../shared/firebase";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

//Actions type
const LOAD = "sns/LOAD";
const LOADES = "user/LOAD";
const CREATE = "sns/CREATE";
const UPDATE = "sns/UPDATE";
const DELETE = "sns/DELETE";

const init = {
  list: [],
};

//Action Creators
export function loadSns(sns_list) {
  return { type: LOAD, sns_list };
}
export function loadAccount(user_list) {
  return { type: LOADES, user_list };
}

export function createSns(sns) {
  return { type: CREATE, sns };
}

export function updateSns(sns) {
  return { type: UPDATE, sns };
}

export function deleteSns(sns_index) {
  return { type: DELETE, sns_index };
}

//Middlewares
export const loadSnsFB = () => {
  return async function (dispatch) {
    const sns_data = await getDocs(collection(db, "sns"));

    let sns_list = [];

    sns_data.forEach((doc) => {
      // console.log(doc.id, doc.data());
      sns_list.push({ id: doc.id, ...doc.data() });

      dispatch(loadSns(sns_list));
    });
  };
};

export const loadFBAccount = (email) => {
  return async function (dispatch) {
    const a = query(collection(db, "user"), where("email", "==", email));
    const result = await getDocs(a);

    const account = {};
    result.forEach((doc) => {
      account.id = doc.id;
      account.data = doc.data();
    });

    dispatch(loadAccount(account));
  };
};

export const addSnsFB = (sns) => {
  return async function (dispatch) {
    const docRef = await addDoc(collection(db, "sns"), sns);
    const sns_data = { id: docRef.id, ...sns };

    console.log(sns);
    dispatch(createSns(sns_data));
  };
};

export const updateSnsFB = (sns) => {
  return async function (dispatch, getState) {
    const docRef = doc(db, "sns", sns.index);
    await updateDoc(docRef, sns);

    dispatch(updateSns({ ...sns }));
  };
};

export const deleteSnsFB = (sns) => {
  console.log(sns);
  return async function (dispatch, getState) {
    const docRef = doc(db, "sns", sns);
    await deleteDoc(docRef);

    console.log(getState().sns.list);

    const sns_list = getState().sns.list;
    const new_sns = sns_list.filter((value) => value.id === sns);
    // console.log("test", new_word);
    dispatch(deleteSns({ new_sns }));
  };
};

// Reducer
export default function reducer(state = init, action = {}) {
  switch (action.type) {
    case "sns/LOAD": {
      return { list: action.sns_list, is_loaded: true };
    }
    case "user/LOAD": {
      return {
        islogin: state.isLogin,
        docId: action.account.id,
        email: action.account.data.email,
        name: action.account.data.name,
        id: action.account.data.id,
      };
    }
    case "sns/CREATE": {
      const new_sns = [...state.list, action.sns];
      return { list: new_sns };
    }
    case "sns/UPDATE": {
      const arr = [...state.list].map((value) => {
        if (value.index === action.sns.index) {
          return { ...value, ...action.sns };
        } else {
          return value;
        }
      });
      return { list: arr };
    }
    case "sns/DELETE": {
      console.log("action", action.sns_index);
      console.log("state", state);
      const arr = [...state.list].filter((value) => {
        if (value.index === action.sns_index.new_sns[0].index) {
          return false;
        } else {
          return true;
        }
      });
      // js듣고 나중에 filter, map, reduce, forEach 연습해보기, =>
      return { list: arr };
    }
    // do reducer stuff
    default:
      return state;
  }
}
