export function Pointer(identifier: string) {
  const [className, objectId] = identifier.split(/\//)

  return {
    __type: 'Pointer',
    className,
    objectId
  }
}
