import React, { useEffect, useState } from "react";
import "./Diary_content.scss";
import { ReactComponent as Logo } from "../../../../assets/img/LandingPage/second_page_logo.svg";

const Diary_content = ({ title, date, writer, content }) => {
  // const [contentArr, setContentArr] = useState([]);
  // const [dateStr, setDateStr] = useState("");

  let d = new Date(date);
  // useEffect(() => {
  //   let arr = content.split(/<.+?>/);
  //   let arr2 = [];
  //   for (var i = 1; i < arr.length; i++) {
  //     if (i % 2 == 1) {
  //       arr2.push(arr[i]);
  //     }
  //   }
  //   console.log(arr, arr2);
  //   setContentArr(arr2);
  //   // 날짜 문자열 화
  //   let d = new Date(date);
  //   let dstr = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate() + 1} `;
  //   setDateStr(dstr);
  // }, []);

  return (
    <div className="diary_section">
      <div className="diary_container">
        <div className="diary_img_box">
          <Logo className="diary_img" />
        </div>
        <div className="diary_content_container">
          <div className="diary_txt_container">
            <div className="diary_txt_top_container">
              <p className="diary_title">{title}</p>
              <p className="diary_writer">{writer}</p>
            </div>
            {/* 반복문 */}
            {content.split(/<.+?>/)[1]}
            {/* {contentArr.map((e) => {
              return <p className="diary_content">{e}</p>;
            })} */}
          </div>
          <div className="diary_footer_container">
            <p className="diary_date">
              {`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`}
            </p>
            <div className="diary_footer_btn_container">
              {/* <div className="diary_footer_btn">
                <FaRegBookmark />
              </div> */}
              {/* <div className="diary_footer_btn">
                <BsThreeDotsVertical />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Diary_content;
