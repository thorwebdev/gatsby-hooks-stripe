import React, { useEffect } from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Image from "../components/image";
import SEO from "../components/seo";

const IndexPage = () => {
  let stripe;
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    stripe = window.Stripe("pk_test_u0thHeHe6aIWH103zeXBUuCO", {
      betas: ["checkout_beta_4"]
    });
  });

  const redirectToCheckout = async () => {
    const { error } = await stripe.redirectToCheckout({
      items: [{ sku: "sku_ESJ0XO5vlX82GQ", quantity: 1 }],

      // Note that it is not guaranteed your customers will be redirected to this
      // URL *100%* of the time, it's possible that they could e.g. close the
      // tab between form submission and the redirect.
      successUrl: `${window.location.origin}/page-2`,
      cancelUrl: `${window.location.origin}/`
    });
  };

  return (
    <Layout>
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now please buy my book.</p>
      <button onClick={redirectToCheckout}>BUY MY BOOK</button>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  );
};

export default IndexPage;
