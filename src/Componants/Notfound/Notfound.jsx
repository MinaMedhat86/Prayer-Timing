import Style from "./Notfound.module.css"
import Lottie from "lottie-react";
import erorr404 from "../../assets/animation/error404.json"
import {Link} from "react-router-dom"


export function Notfound() {
  return <>

<section className="py-5">
  <div className="d-flex flex-column align-items-center">
    <div className="w-100 d-flex justify-content-center">
      <Lottie animationData={erorr404} className={` ${Style.error404}  rounded-lg`}  />
    </div>
    <Link
      to="/prayers-timing"
      className="mt-3 btn btn-dark w-25 py-2 text-center"
    >
      Back To Home
    </Link>
  </div>
</section>

  </>
}
