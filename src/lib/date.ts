export const dayObject = {
  월: 'mon',
  화: 'tue',
  수: 'wed',
  목: 'thu',
  금: 'fri',
  토: 'sat',
  일: 'sun',
};

export const convertDateToString = (dateTime: Date) => {
  const dateToString = String(dateTime).split('T')[0];
  const [year, month, day] = dateToString.split('-');
  return `${year}년 ${month}월 ${day}일`;
};

export const getKorAvailableDay = (availableDayList: string[]) => {
  const availableDay = [];
  Object.keys(dayObject).map((korDay) => {
    if (availableDayList.includes(dayObject[korDay]))
      return availableDay.push(korDay);
  });
  return availableDay.join(', ');
};
