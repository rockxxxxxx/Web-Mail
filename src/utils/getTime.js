function getTime() {
  const date = new Date();
  const showTime = date.getHours() + ":" + date.getMinutes();

  return showTime;
}

export default getTime;
