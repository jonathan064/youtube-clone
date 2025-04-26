"use client";

import { Fragment } from "react";
import { signInWithGoogle, signOut } from "../firebase/firebase";
import styles from "./sign-in.module.css";
import { User } from "firebase/auth";

interface SignInProps {
  user: User | null;
}

export default function SignIn({ user }: SignInProps) {
  return (
    <Fragment>
      {user ? (
        //If user signed in
        <button className={styles.signin} onClick={signOut}>
          Sign Out
        </button>
      ) : (
        //If user signed out
        <button className={styles.signin} onClick={signInWithGoogle}>
          Sign In
        </button>
      )}
    </Fragment>
  );
}
