import React from "react";

export const Footer = () => {
  return (
    <div className="page-footer">
      <footer>
        <a className="unimelb-lge" href="https://unimelb.edu.au">
          <img
            src="https://d2h9b02ioca40d.cloudfront.net/v7.0.1/assets/lockup-1cbf0.svg"
            width="300"
            height="100"
            alt="The University of Melbourne"
          />
        </a>
        <ul className="people-links">
          <li>
            <a href="http://students.unimelb.edu.au">Current Students</a>
          </li>
          <li>
            <a href="http://staff.unimelb.edu.au">Staff</a>
          </li>
          <li>
            <a href="http://alumni.unimelb.edu.au/">Alumni</a>
          </li>
        </ul>
        <ul className="quicklinks clearfix">
          <li>
            <a href="http://about.unimelb.edu.au/governance-and-leadership/faculties">
              <svg role="img" className="icon">
                <use xlinkHref="#icon-faculty" />
              </svg>
              Faculties and Graduate Schools
            </a>
          </li>
          <li>
            <a href="http://library.unimelb.edu.au/">
              <svg role="img" className="icon">
                <use xlinkHref="#icon-library" />
              </svg>
              Library
            </a>
          </li>
          <li>
            <a href="http://www.unimelb.edu.au/contact/">
              <svg role="img" className="icon">
                <use xlinkHref="#icon-phone" />
              </svg>
              Contact us
            </a>
          </li>
          <li>
            <a href="https://maps.unimelb.edu.au/">
              <svg role="img" className="icon">
                <use xlinkHref="#icon-location" />
              </svg>
              Maps
            </a>
          </li>
          <li>
            <a href="http://www.campaign.unimelb.edu.au/">
              <svg role="img" className="icon">
                <use xlinkHref="#icon-campaign" />
              </svg>
              Support the Campaign
            </a>
          </li>
          <li>
            <a href="http://about.unimelb.edu.au/careers">
              <svg role="img" className="icon">
                <use xlinkHref="#icon-jobs" />
              </svg>
              Jobs
            </a>
          </li>
        </ul>
        <div className="ind-ack">
          We acknowledge and pay respect to the Traditional Owners of the lands
          upon which our campuses are situated.
        </div>
        <ul className="page-footer-section nav">
          <li>
            <a href="http://safety.unimelb.edu.au/emergency">
              Emergency Information
            </a>
          </li>
          <li>
            <a href="http://www.unimelb.edu.au/governance/disclaimer">
              Disclaimer &amp; Copyright
            </a>
          </li>
          <li>
            <a href="http://www.unimelb.edu.au/accessibility">Accessibility</a>
          </li>
          <li>
            <a href="http://www.unimelb.edu.au/governance/compliance/privacy">
              Privacy
            </a>
          </li>
        </ul>
        <ul className="page-footer-section social">
          <li className="social-facebook">
            <a href="https://www.facebook.com/unimelb">
              <svg role="img" className="icon">
                <use xlinkHref="#icon-facebook" />
              </svg>
              Facebook
            </a>
          </li>
          <li className="social-twitter">
            <a href="https://www.twitter.com/unimelb">
              <svg role="img" className="icon">
                <use xlinkHref="#icon-twitter" />
              </svg>
              Twitter
            </a>
          </li>
          <li className="social-linkedin">
            <a href="https://www.linkedin.com/school/university-of-melbourne">
              <svg role="img" className="icon">
                <use xlinkHref="#icon-linkedin" />
              </svg>
              LinkedIn
            </a>
          </li>
        </ul>
        <small>Phone: 13 MELB (13 6352) | International: +61 3 9035 5511</small>
        <small>The University of Melbourne ABN: 84 002 705 224</small>
        <small>
          CRICOS Provider Code: 00116K (
          <a href="http://www.services.unimelb.edu.au/international/visas/index.html">
            visa information
          </a>
          )
        </small>
      </footer>
    </div>
  );
};
