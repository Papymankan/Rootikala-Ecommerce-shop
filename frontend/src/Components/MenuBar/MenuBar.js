import React from "react";
import { CiMenuBurger } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function MenuBar() {
  return (
  <>
    <div className="topBar">
        <div className="topBarRow">
            <div className="topBarItems">
                <CiMenuBurger/>
                دسته بندی ها
            </div>
            <div className="topBarItems">
                <Link>
                    فروش ویژه
                </Link>
            </div>
            <div className="topBarItems">
                <Link>
                    راهنمای خرید
                </Link>
            </div>
            <div className="topBarItems">
                سایر ...
            </div>
        </div>
    </div>
  </>
    );
}
