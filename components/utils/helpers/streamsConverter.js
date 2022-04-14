const timeCoverter = (time) => {
  const timeInMin = time / 60;
  if (timeInMin < 60) {
    return {
      time: timeInMin.toFixed(0),
      timeUnit: 'min',
    };
  } else {
    const timeInHours = time / 3600;
    return {
      time: timeInHours.toFixed(0),
      timeUnit: 'hours',
    };
  }
};

export default timeCoverter;
