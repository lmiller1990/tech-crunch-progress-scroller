const getPosRelativeToBody = (el) => {
  return Math.abs(
    document.documentElement.getBoundingClientRect().top - el.getBoundingClientRect().top
  )
}

const getScrollPercentage = (startMarker, marker, circle, circumference) => {
  const offsetFromTop = getPosRelativeToBody(startMarker) + marker.getBoundingClientRect().height

  const total = getPosRelativeToBody(marker) - getPosRelativeToBody(startMarker) - window.innerHeight
  const progress = (((window.scrollY - offsetFromTop) / total) * 100).toFixed(10)

  const offset = circumference - (circumference * (progress * 0.01))

  if (progress < 0) {
    circle.style.strokeDashoffset = (Math.PI * 100).toFixed(10)
    return
  }

  if (progress > 100) {
    circle.style.strokeDashoffset = '0'
    return
  }

  circle.style.strokeDashoffset = `${offset}`
}

const exec = () => {
  const circle = document.querySelector('circle')
  const radius = circle.r.baseVal.value
  const circumference = radius * 2 * Math.PI
  circle.style.strokeDasharray = `${circumference} ${circumference}`

  const startMarker = document.querySelector('#start-marker')
  const marker = document.querySelector('#progress-marker')

  circle.style.strokeDashoffset = `${circumference}`

  window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
      getScrollPercentage(startMarker, marker, circle, circumference)
    })
  })
}

document.addEventListener('DOMContentLoaded', exec)

