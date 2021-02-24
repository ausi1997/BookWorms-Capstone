import React from "react";

const Contact = () => {

  const contactUs = () => {
    window.alert("Message sent successfully");
  }
  return (
    <>
    <div class="breacrumb-section">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="breadcrumb-text">
                    <a href="#"><i class="fa fa-home"></i> Home</a>
                    <span>Contact</span>
                </div>
            </div>
        </div>
    </div>
</div>
     <section className="contact-section spad">
  <div className="container">
      <div className="row">
          <div className="col-lg-5">
              <div className="contact-title">
                  <h4>Contact Us</h4>
                  <p>You can contact any time between 9 AM to 6 PM (Monday to Saturday).</p>
              </div>
              <div className="contact-widget">
                  <div className="cw-item">
                      <div className="ci-icon">
                          <i className="ti-location-pin"></i>
                      </div>
                      <div className="ci-text">
                          <span>Address:</span>
                          <p>ABC Building XYZ Road India</p>
                      </div>
                  </div>
                  <div className="cw-item">
                      <div className="ci-icon">
                          <i className="ti-mobile"></i>
                      </div>
                      <div className="ci-text">
                          <span>Phone:</span>
                          <p>+91 9999 9999 999</p>
                      </div>
                  </div>
                  <div className="cw-item">
                      <div className="ci-icon">
                          <i className="ti-email"></i>
                      </div>
                      <div className="ci-text">
                          <span>Email:</span>
                          <p>admin@bookworms.com</p>
                      </div>
                  </div>
              </div>
          </div>
          <div className="col-lg-6 offset-lg-1">
              <div className="contact-form">
                  <div className="leave-comment">
                      <h4>Leave A Comment</h4>
                      <p>Our staff will call back later and answer your questions.</p>
                      <form action="#" className="comment-form">
                          <div className="row">
                              <div className="col-lg-6">
                                  <input type="text" placeholder="Your name" />
                              </div>
                              <div className="col-lg-6">
                                  <input type="text" placeholder="Your email" />
                              </div>
                              <div className="col-lg-12">
                                  <textarea placeholder="Your message"></textarea>
                                  <button onClick={contactUs} type="submit" className="site-btn">Send message</button>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  </div>
</section>
</>
);
};

export default Contact;
