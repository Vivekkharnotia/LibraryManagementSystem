import VisitBlog from "components/general/VisitBlog/VisitBlog";
import React from "react";

const sample_txt =
  `When Nick began sending out Friday Notes in 2019, he was already in the habit of regularly writing. Since the company's early days, he has written to clarify his thoughts around specific practices and processes — around hiring, culture, and product-market fit, for example — and to drive his own leadership development. He writes notes for his own reference throughout the day to keep a record of conversations and ideas; drafts shareholder updates; and, regularly processes a variety of company and personal insights on the page.<br><br>In a Friday Note on the topic of writing that he sent out to the team in 2021, Nick shared that he spends 20-30% of his time writing creatively. That's a big block of the CEO's calendar, and the commitment reflects his belief in the value of this practice. “Next to hiring, writing is quite possibly the most important thing a leader can do to move the needle in their organization,” he said. “Writing helps us identify signals in the noise and catalyzes clarity of thought."`;
const sample2 =
  "<b>Here is the sub title</b><br><hr>&#8594; &nbsp;AA Lorem <div>ipsum</div>&#8594; &nbsp; dolor sit amet consectetur adipisicing elit. Distinctio, aperiam laudantium. Ipsam repellat eos vero a tempore numquam provident ill<br>&#8594; &nbsp;AA Lorem ipsum <br>&#8594; &nbsp; dolor sit amet consectetur adipisicing elit. Distinctio, aperiam laudantium. Ipsam repellat eos ve<br>AA Lorem ipsum <br>&#8594; &nbsp; dolor sit amet consectetur adipisicing elit. Distinctio, aperiam laudantium. Ipsam repellat eos vero a tempore numquam provident ill";
const data = {
  title_list: [
    "Writing catalyzes clarity — and connects community",
    "Writing catalyzes clarity — and connects community",
    "Writing catalyzes clarity — and connects community",
    "Title4",
  ],
  content_list: [sample_txt, sample_txt, sample_txt, sample_txt],
};

function index() {
  return (
    <>
      <VisitBlog data={data} />
    </>
  );
}

export default index;
