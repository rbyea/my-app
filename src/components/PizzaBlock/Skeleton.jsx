import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <div className="pizza-width">
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={280}
      height={466}
      viewBox="0 0 280 466"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="135" cy="116" r="117" />
      <rect x="4" y="250" rx="10" ry="10" width="270" height="29" />
      <rect x="5" y="302" rx="10" ry="10" width="270" height="88" />
      <rect x="7" y="421" rx="10" ry="10" width="96" height="27" />
      <rect x="120" y="411" rx="27" ry="27" width="152" height="45" />
    </ContentLoader>
  </div>

)

export default Skeleton