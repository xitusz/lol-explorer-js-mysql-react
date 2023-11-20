import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { BsArrowUp } from "react-icons/bs";

const Footer = () => {
  return (
    <div id="footer">
      <div className="mx-5">
        <div className="w-full mx-auto p-4">
          <div className="arrow-div">
            <BsArrowUp
              size={45}
              className="text-white arrow-icon"
              data-testid="arrow-icon"
              onClick={() => window.scrollTo(0, 0)}
            />
          </div>
          <div>
            <ul className="d-flex flex-wrap list-inline align-items-center justify-content-center">
              <li className="p-1">
                <a
                  href="https://www.linkedin.com/in/gabrielalves1/"
                  target="_blank"
                  rel="noreferrer"
                  data-testid="linkedin-link"
                >
                  <FaLinkedin
                    size={26}
                    className="text-white icon"
                    data-testid="linkedin-icon"
                  />
                </a>
              </li>
              <li className="p-1">
                <a
                  href="mailto:2kgabrielalves@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  data-testid="gmail-link"
                >
                  <FiMail
                    size={30}
                    className="text-white icon"
                    data-testid="gmail-icon"
                  />
                </a>
              </li>
              <li className="p-1">
                <a
                  href="https://github.com/xitusz"
                  target="_blank"
                  rel="noreferrer"
                  data-testid="github-link"
                >
                  <FaGithub
                    size={26}
                    className="text-white icon"
                    data-testid="github-icon"
                  />
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-4 mx-auto hr-footer" />
          <div>
            <p className="text-center text-footer">
              © 2023{" "}
              <a
                href="https://github.com/xitusz"
                target="_blank"
                rel="noreferrer"
                className="a-footer"
              >
                Gabriel Alves
              </a>
              . All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
