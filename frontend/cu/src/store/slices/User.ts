import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { pureFinalPropsSelectorFactory } from "react-redux/es/connect/selectorFactory";
import { create } from "ts-node";
import { RootState } from "..";

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


// 그나마 참고할 만한 자료
// Reducer: https://github.com/swsnu/swpp2021-team13/blob/main/frontend/probloom/src/store/reducers/userReducer.tsx
// Actions: https://github.com/swsnu/swpp2021-team13/blob/main/frontend/probloom/src/store/actions/userActions.tsx
// ActionTypes: https://github.com/swsnu/swpp2021-team13/blob/main/frontend/probloom/src/store/actions/actionTypes.tsx
// 이들의 user 객체(우리와 동일): https://github.com/swsnu/swpp2021-team13/blob/main/backend/probloom/prob/models.py
export interface UserType {
  // reducers/userReducer.tsx/interface User에 대응
  id: number;
  username: string;
  password: string;
  gender: number;
  age: number;
  taste: string;
  question: number;
  loginState: boolean;
}
export interface UserLoginRequest {
  // actions/userActions.tsx/SigninRequest에 대응
  // 로그인에 필요한 정보
  username: string;
  password: string;
}
export interface UserSignupRequest {
  // id: number;
  username: string;
  password: string;
  gender: number;
  age: number;
  taste: string;
  question: number;
  // loginState: boolean;
}

export interface SurveyRequest {
  gender: number;
  age: number;
  taste: string;
  question: number;
}

export interface UserState {
  users: UserType[];
  selectedUser: UserType | null;
}


export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (user: void, { dispatch }) => {
    const response = await axios.get("api/user/userlist/");
    console.log(response);
    dispatch(userActions.getUsers(response.data));
    return response.data ?? null;
  }
)

/*
const getUsersTemp: UserType[] = async () => {
  const response = await axios.get("api/user/userlist/");
  const tempResponse = JSON.stringify(response.data);
  const user_list = JSON.parse(tempResponse) as UserType[];
  return user_list;
}
*/


const initialState: UserState = {
  //users: getUsersTemp(),
  users: [],
  selectedUser: null,
};

export const getRequestUser = createAsyncThunk(
  "user/getRequestUser",
  async (user: void, { dispatch }) => {
    const response = await axios.get("api/user/requestUser/");
    console.log(response);
    console.log(response.data);
    dispatch(userActions.getRequestUser(response.data));
    return response.data ?? null;
  }
)

// signup 회원가입에 사용되는 함수 
// Pick<UserType 옆에 넣는 거 빼고는 수정 안 함
export const postUser = createAsyncThunk( // signup
  "user/postUser",
  async (user: Pick<UserSignupRequest, "username" | "password" | "age" | "gender" | "question" | "taste">, { dispatch }) => {
    const response = await axios.post("api/user/signup/", user);
    console.log(response);
    dispatch(userActions.addUser(response.data));
  }
);

// 방금 추가한 내용, 다음을 참고하세요
// swppfall2022-team19/backend/cu/user/views.py
// 로그인 signin에 사용되는 함수
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user: Pick<UserLoginRequest, "username" | "password">, { dispatch }) => {
    // console.log("user ", user.username , user.password )
    const response = await axios.post("api/user/signin/", user);
    console.log(response);
    dispatch(userActions.loginUser(response.data));
    // 그런데 로그인의 경우 로그인 실패 시 에러가 발생할 수도 있음
    // 에러 HttpResponse(status=401)인데, 로그인 오류 시 alert 

  }
)

export const signoutUser = createAsyncThunk(
  "user/signoutUser",
  async (user: void, { dispatch }) => {
    // console.log("user ", user.username , user.password )
    const response = await axios.get("api/user/signout/");
    console.log(response);
    console.log(response.data);
    dispatch(userActions.signoutUser(response.data));
    // 그런데 로그인의 경우 로그인 실패 시 에러가 발생할 수도 있음
    // 에러 HttpResponse(status=401)인데, 로그인 오류 시 alert 

  }
)


// User의 Survey 내용을 수정할 수 있는 함수
// export const putSurvey = createAsyncThunk
/*
export const putSurvey = createAsyncThunk<
  null, 
  { id: UserType["id"]; newSurvey: SurveyRequest}
>("user/putSurvey", async({id, newSurvey}, {dispatch})=> {
  const response = await axios.put(`api/user/newSurvey/${id}`, newSurvey);
  dispatch(userActions.putSurvey(response.data));
});
*/

export const putSurvey = createAsyncThunk(
  "user/newSurvey",
  async (user: Pick<UserType, "id" | "age" | "gender" | "taste" | "question">, { dispatch }) => {
    const response = await axios.put(`api/user/newSurvey/${user.id}`, user);
    console.log(response);
    dispatch(userActions.putSurvey(response.data));

  }
)


/*
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (username: UserType["username"], { dispatch }) => {
    const response = await axios.get(`/api/user/login/`);
    return response.data ?? null;
  }
);


export const putUser = createAsyncThunk( // login
  "user/putUser",
  async (user: Pick<UserType, "username" | "password">, { dispatch }) => {
    const response = await axios.put("/api/user/login/", user);
    if( response.data == null ){ // if login failed ,
      console.log("login failed in putUser")

    }else{
    dispatch(userActions.loginUser(response.data));}
  }
);
*/

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getRequestUser: (state, action: PayloadAction<UserType>) => {
      console.log("getRequestUser의 리듀서 실행됨");
      console.log(action.payload);
      console.log(state.selectedUser);
      if (action.payload === null || action.payload === undefined) {
        state.selectedUser = null;
        console.log("현재 로그인된 게 없어서 action.payload도 비어있어서 selectedUser에 null을 줌");
      } else {
        const targetUser = state.users.find(
          (user: UserType) => (user.username === action.payload.username)
          // && (user.password === action.payload.password)
        );
        if (targetUser) {
          state.selectedUser = targetUser;
          console.log("targetUser를 selectedUser로");
        } else {
          console.log("targetUser가 undefined라 selectedUser는 null로");
          state.selectedUser = null;
        }

        console.log("targetUser");
        console.log(targetUser);

      }
    },
    getUsers: (state, action: PayloadAction<UserType[]>) => {
      console.log(action.payload);
      if (action.payload === null || action.payload === undefined) {
        console.log("아직까지 아무 User도 등록되지 않은 듯?");
      } else {
        var user_list: UserType[] = [];
        for (var i = 0; i < action.payload.length; i++) {
          user_list.push({ "id": action.payload[i].id, "username": action.payload[i].username, "password": action.payload[i].password, "age": action.payload[i].age, "gender": action.payload[i].gender, "loginState": action.payload[i].loginState, "taste": action.payload[i].taste, "question": action.payload[i].question });
        }

        state.users = user_list;
        console.log(user_list);
      }
    },
    loginUser: (state, action: PayloadAction<UserLoginRequest>) => {
      console.log(state.users);
      console.log(state.selectedUser);
      console.log(action.payload);
      const targetUser = state.users.find(
        (user: UserType) => (user.username === action.payload.username)
        // && (user.password === action.payload.password)
      );

      console.log("The targetUser in loginUser is");
      console.log(targetUser);

      if (targetUser) {
        targetUser.loginState = true;
        state.selectedUser = targetUser;
        console.log(state.selectedUser);
        localStorage.setItem("selectedUser", targetUser.username);

        console.log("Logged_in User: " + targetUser.username);

      }
      else {
        console.log("targetUser is None. Username might be wrong");
        console.log(targetUser);
        alert("targetUser is none");
        state.selectedUser = null;
      };

    },

    signoutUser: (state, action: PayloadAction<UserLoginRequest>) => {

      state.selectedUser!.loginState = false;
      state.selectedUser = null;
      localStorage.removeItem("selectedUser");

    },

    addUser: ( // register, signup
      state,
      action: PayloadAction<UserType>
    ) => {
      // return { ...state, selectedUser: action}
      console.log(action.payload);

      const newUser = {
        id: action.payload.id, // state.users[state.users.length - 1].id + 1, // temporary
        username: action.payload.username,
        password: action.payload.password,

        gender: action.payload.gender,
        age: action.payload.age,
        taste: action.payload.taste,
        question: action.payload.question,
        loginState: false
      };
      state.users.push(newUser);
      console.log(newUser);
      console.log("state.users를 모두 반환합니다");
      console.log(state.users.length);

      for (var i = 0; i < state.users.length; i++) {
        console.log(state.users[i]);
      }



    },
    putSurvey: (state, action: PayloadAction<SurveyRequest>) => {
      if (state.selectedUser == null) {
        console.log("state.selectedUser is null");
      } else {
        state.selectedUser.gender = action.payload.gender;
        state.selectedUser.age = action.payload.age;
        state.selectedUser.taste = action.payload.taste;
        state.selectedUser.question = action.payload.question;
      }

    },



    /*
    getAll: (state, action: PayloadAction<{ users: UserType[] }>) => { },
    getUser: (state, action: PayloadAction<{ targetId: number }>) => {
      const target = state.users.find(
        (user) => user.username === action.payload.targetusername
      );
      state.selectedUser = target ?? null;
    },
    

    loginUser: ( // login 
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) => {

      const target = state.users.find(
        (user) => user.username === action.payload.username

      );


      state.selectedUser = target ?? null;

      if (target != null && target.password === action.payload.password) target.loginState = true // logged in 
      // check target is null after login trial.
     

    }
     */
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    /*
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.selectedUser = action.payload;
    });
    builder.addCase(postUser.rejected, (_state, action) => {
      console.error(action.error);
    });
    */
  },
});

export const userActions = userSlice.actions;
export const selectUser = (state: RootState) => state.user.selectedUser;
export const userList = (state: RootState) => state.user.users;

export default userSlice.reducer;




/*
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


export interface UserType {
  username: string;
  password: string;
  loginState: boolean;
}

export interface UserState {
  users: UserType[];
  selectedUser: UserType | null;
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
};


export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (username: UserType["username"], { dispatch }) => {
    const response = await axios.get(`/api/user/login/`);
    return response.data ?? null;
  }
);

export const postUser = createAsyncThunk( // signup
  "user/postUser",
  async (user: Pick<UserType, "username" | "password" >, { dispatch }) => {
    const response = await axios.post("/api/user/signup/", user);
    console.log("postUser")
    dispatch(userActions.addUser(response.data));
  }
);

export const putUser = createAsyncThunk( // login
  "user/putUser",
  async (user: Pick<UserType, "username" | "password" >, { dispatch }) => {
    const response = await axios.put("/api/user/login/", user);
    if( response.data == null ){ // if login failed ,
      console.log("login failed in putUser")

    }else{
    dispatch(userActions.loginUser(response.data));}
  }
);


export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getAll: (state, action: PayloadAction<{ users: UserType[] }>) => {},
    getUser: (state, action: PayloadAction<{ targetusername: string }>) => {
      const target = state.users.find(
        (user) => user.username === action.payload.targetusername
      );
      state.selectedUser = target ?? null;
    },
    addUser: ( // register 
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) => {

      const newUser = {
    
        username: action.payload.username,
        password: action.payload.password,
        loginState: false 
      };
      state.users.push(newUser);
    },

    loginUser:  ( // login 
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) => {

      const target = state.users.find(
        (user) => user.username === action.payload.username
      );

      state.selectedUser = target ?? null;

      if(target!=null && target.password === action.payload.password) target.loginState = true // logged in 
      // check target is null after login trial.

      }    
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.selectedUser = action.payload;
    });
    builder.addCase(postUser.rejected, (_state, action) => {
      console.error(action.error);
    });

    builder.addCase(putUser.rejected, (_state, action) => {
      console.error(action.error);
    });
  },
});

export const userActions = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
*/
