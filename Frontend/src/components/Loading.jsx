import PropTypes from "prop-types"

const Loader = ({ size = "md", color = "blue" }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  }

  const colorClasses = {
    blue: "border-blue-500",
    green: "border-green-500",
    red: "border-red-500",
    yellow: "border-yellow-500",
    purple: "border-purple-500",
  }

  return (
    <div className=" w-full h-screen flex justify-center items-center ">
      <div
        className={`
          ${sizeClasses[size] || sizeClasses.md}
          ${colorClasses[color] || colorClasses.blue}
          border-4 border-t-transparent rounded-full animate-spin mb-64
        `}
      ></div>
    </div>
  )
}

Loader.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  color: PropTypes.oneOf(["blue", "green", "red", "yellow", "purple"]),
}

export default Loader

