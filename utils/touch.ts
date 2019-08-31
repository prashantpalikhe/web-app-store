export function toggleBodyScroll({ block = true }) {
  if (block) {
    document.addEventListener('touchstart', preventBodyScroll, {
      passive: false
    })
  } else {
    document.removeEventListener('touchstart', preventBodyScroll)
  }
}

function preventBodyScroll(e: TouchEvent) {
  e.preventDefault()
}
