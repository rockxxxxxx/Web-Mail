import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInbox } from "../../reducer/inboxReducer";
import Modal from "../modal/Modal";

export default function Home() {
  const data = useSelector((data) => data.mail.inbox);
  console.log(data);
  const email = useSelector((data) => data.authentication.email);
  const dispatch = useDispatch();
  console.log(email);

  useEffect(() => {
    dispatch(fetchInbox(email));
  }, [email]);
  return <div>home</div>;
}
