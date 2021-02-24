import React from "react";

const Faq = () => {
  return (
    <>
    <div class="breacrumb-section">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="breadcrumb-text">
                    <a href="#"><i class="fa fa-home"></i> Home</a>
                    <span>FAQs</span>
                </div>
            </div>
        </div>
    </div>
</div>
    <div className="faq-section spad">
        <div className="container">
        <div className="contact-title">
        <h3>Frequently Asked Questions</h3></div></div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="faq-accordin">
              <div className="accordion" id="accordionExample">
                <div className="card">
                  <div className="card-heading active">
                      
                    <a
                      className="active"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                    >
                      Will you guys deliver the books as per address?
                    </a>
                  </div>
                  <div
                    id="collapseOne"
                    className="collapse show"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <p>No, Currently doorstep delivery is not available.</p>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-heading">
                    <a data-toggle="collapse" data-target="#collapseTwo">
                      What kind of materials i can share on this website?
                    </a>
                  </div>
                  <div
                    id="collapseTwo"
                    className="collapse"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <p>
                        You can share any kind of educational materials like
                        personal notes, books,Stationaries etc.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-heading">
                    <a data-toggle="collapse" data-target="#collapseThree">
                      How do i change my personal details or e mail address?
                    </a>
                  </div>
                  <div
                    id="collapseThree"
                    className="collapse"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <p>
                        You can easily change all your information on your
                        account.Go to home page, login to the app.Click on menu
                        bar.Under menu bar click on My profile and update your
                        details.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Faq;
