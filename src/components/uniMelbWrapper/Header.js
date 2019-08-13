import React from "react";

export const Header = () => {
  return (
    <div className="page-header" role="banner">
      <header>
        <a className="page-header-logo" href="https://www.unimelb.edu.au">
          <img
            src="https://d2h9b02ioca40d.cloudfront.net/v7.0.1/assets/logo-4d389.svg"
            width="117"
            height="117"
            alt="The University of Melbourne homepage"
          />
        </a>
        <nav className="page-header-navigation" aria-label="breadcrumbs">
          <a href="https://unimelb.edu.au/" title="The University of Melbourne">
            <span
              data-icon="home"
              data-bound-iconhelper="cjvuwjsyg00003h5xxtii4cmb"
            >
              <svg className="icon" role="img" focusable="false">
                <use xlinkHref="#icon-home" />
              </svg>
            </span>
            The University of Melbourne
          </a>
        </nav>
        <nav className="page-header-tools">
          <a className="page-header-icon" href="#sitemap" title="Search">
            <svg role="img" focusable="false">
              <svg
                id="icon-search"
                viewBox="0 0 49 48"
                width="100%"
                height="100%"
              >
                <path d="M32.6 29.2h-1.8l-.6-.6c2.2-2.6 3.6-6 3.6-9.7C33.8 10.7 27.1 4 18.9 4S4 10.7 4 18.9s6.7 14.9 14.9 14.9c3.7 0 7.1-1.3 9.7-3.6l.6.6v1.8L40.6 44l3.4-3.4-11.4-11.4zm-13.7 0c-5.7 0-10.3-4.6-10.3-10.3 0-5.7 4.6-10.3 10.3-10.3 5.7 0 10.3 4.6 10.3 10.3 0 5.7-4.6 10.3-10.3 10.3z" />
              </svg>
            </svg>
            Search
          </a>
          <a className="page-header-icon" href="#sitemap" title="Menu">
            <svg role="img" focusable="false">
              {/* In Header.js and Footer.js replace all <use xlinkHref.../> with the actual rendered SVG from Chrome Dev TOOLS. See the icon-search above: make sure you get the SVG (with the viewBox attribute) and the Path attribute. */}
              <svg
                id="icon-menu"
                viewBox="0 0 49 48"
                width="100%"
                height="100%"
              >
                <path d="M6 36h36v-4H6v4zm0-10h36v-4H6v4zm0-14v4h36v-4H6z" />
              </svg>
            </svg>
            Menu
          </a>
        </nav>
        <div className="page-header-search">
          <form
            className="search"
            action="https://search.unimelb.edu.au"
            method="get"
          >
            <fieldset>
              <div className="inline attached">
                <span className="fill">
                  <input
                    id="header_q"
                    name="q"
                    type="search"
                    placeholder="Search the University"
                    aria-label="Search the University"
                  />
                </span>
                <span>
                  <button className="inline-button" type="submit">
                    <span
                      className="small icon--hide-label"
                      data-icon="search"
                      data-bound-iconhelper="cjvuwjsyi00013h5x2ni1oevg"
                    >
                      <svg className="icon" role="img" focusable="false">
                        <use xlinkHref="#icon-search" />
                      </svg>
                      <span className="icon-label">Go</span>
                    </span>
                  </button>
                </span>
              </div>
            </fieldset>
            <a className="page-header-icon" href="#">
              <svg className="icon" role="img">
                {/* <use
                  xlink:href="#icon-close"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                /> */}
              </svg>
              Close
            </a>
          </form>
        </div>
      </header>
    </div>
  );
};
