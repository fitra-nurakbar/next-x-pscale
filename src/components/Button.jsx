import styles from "../styles/Home.module.css"

export default function Button(props) {
  const {
    className = "bg-sky-500 text-white",
    text = "Button",
    children,
  } = props

  return (
    <button {...props} className={`${className} ${styles.button}`}>
      {children || text}
    </button>
  )
}
