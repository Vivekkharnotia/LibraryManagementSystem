import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "components/general/firebase-config";
import { initialCreateAccData, initialLoginData } from "../constants";
import { Dispatch, SetStateAction } from "react";
import { OptionsType } from "cookies-next/lib/types";
import {
  validateEmail,
  validateConfirmPassword,
  validateName,
  validatePassword,
} from "./validation";
import { doc, setDoc } from "firebase/firestore";
import { NextRouter } from "next/router";

interface CreateAccountData {
  fname: string;
  lname: string;
  email: string;
  password: string;
  cPassword: string;
}

interface CreateAccountError {
  email_err: boolean;
  fname_err: boolean;
  lname_err: boolean;
  password_err: boolean;
  cPassword_err: boolean;
}

export const handleLogin = async (
  loginData: { email: string; password: string },
  setLoginEmailErr: Dispatch<SetStateAction<boolean>>,
  setLoginData: Dispatch<
    SetStateAction<{
      email: string;
      password: string;
    }>
  >,
  setLoggedIn: Dispatch<SetStateAction<boolean>>,
  setCookie: (key: string, data: any, options?: OptionsType) => void,
  router: NextRouter
) => {
  const res_email = validateEmail(loginData.email);
  setLoginEmailErr(!res_email);
  if (res_email == true) {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      setLoginData(initialLoginData);
      setLoggedIn(true);
      if (window) {
        window.localStorage.setItem("loggedIn", "true");
        window.localStorage.setItem("uid", user.user.uid);
      }

      setCookie("uid", user.user.uid, {
        path: "/",
        sameSite: true,
        secure: true,
        maxAge: 3600 * 24 * 7,
      });

      router.push("/app");
    } catch (error: any) {
      alert(error);
    }
  }
};

export const handleCreateAccount = async (
  createAccData: CreateAccountData,
  setCreateAccData: Dispatch<SetStateAction<CreateAccountData>>,
  setErr: Dispatch<SetStateAction<CreateAccountError>>,
  setLoggedIn: Dispatch<SetStateAction<boolean>>,
  setCookie: (key: string, data: any, options?: OptionsType) => void,
  router: NextRouter
) => {
  let validCred = true;
  const res_fname = validateName(createAccData.fname);
  if (!res_fname) validCred = false;
  setErr((currState) => {
    return { ...currState, fname_err: !res_fname };
  });

  const res_lname = validateName(createAccData.lname);
  if (!res_lname) validCred = false;
  setErr((currState) => {
    return { ...currState, lname_err: !res_lname };
  });

  const res_mail = validateEmail(createAccData.email);
  if (!res_mail) validCred = false;
  setErr((currState) => {
    return { ...currState, email_err: !res_mail };
  });

  const res_password = validatePassword(createAccData.password);
  if (!res_password) validCred = false;
  setErr((currState) => {
    return { ...currState, password_err: !res_password };
  });

  const res_cPassword = validateConfirmPassword(
    createAccData.password,
    createAccData.cPassword
  );
  if (!res_cPassword) validCred = false;
  setErr((currState) => {
    return { ...currState, cPassword_err: !res_cPassword };
  });

  if (validCred) {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        createAccData.email,
        createAccData.password
      );
      await updateProfile(auth.currentUser!, {
        displayName: `${createAccData.fname} ${createAccData.lname}`,
      }).catch((err) => console.log(err));
      const userId = user.user.uid;
      await setDoc(doc(db, "Userdata", userId), {
        fname: createAccData.fname,
        lname: createAccData.lname,
        email: createAccData.email,
      });
      setCreateAccData(initialCreateAccData);
      setLoggedIn(true);
      if (window) {
        window.localStorage.setItem("loggedIn", "true");
        window.localStorage.setItem("uid", userId);
      }
      setCookie("uid", userId, {
        path: "/",
        sameSite: true,
        secure: true,
        maxAge: 3600 * 24 * 7,
      });
      router.push("/app");
    } catch (error: any) {
      alert(error.message);
    }
  }
};
