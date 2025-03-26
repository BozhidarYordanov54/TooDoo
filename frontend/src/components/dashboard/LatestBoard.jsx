import { NavLink } from "react-router-dom"
import CardLink from "./CardLink"

export default function LatestBoard({ props }) {
    return (
        <>
            <CardLink title={props.title} imgURL={props.imgUrl} link={`/board/${props.title}`} />
        </>
    )
}