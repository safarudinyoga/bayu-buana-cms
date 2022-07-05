import moment from 'moment'

export const handleYears = (numOfYears, date = new Date(), type) => {
  const dateCopy = new Date(date.getTime());

  if (type === 'add') {
    dateCopy.setFullYear(dateCopy.getFullYear() + numOfYears);
  } else {
    dateCopy.setFullYear(dateCopy.getFullYear() - numOfYears);
  }


  return dateCopy;
}

export const generateArrayOfYears = (maxYear = 10, minYear = 10) => {
  const yearNow = moment().year()
  const max = yearNow + maxYear
  const min = yearNow - minYear
  const years = []

  for (let i = max; i >= min; i--) {
    years.push(i)
  }

  return years
}