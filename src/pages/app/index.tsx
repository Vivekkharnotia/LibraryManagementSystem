import React from 'react'
import Sidebar from '../../../components/general/Sidebar/Sidebar'
import VisitBlog from '../../../components/general/VisitBlog/VisitBlog.js';

const sample_txt = "AA Lorem ipsum <br> dolor sit amet consectetur adipisicing elit. Distinctio, aperiam laudantium. Ipsam repellat eos vero a tempore numquam provident illum omnis laboriosam iure, suscipit at rem quibusdam laborum necessitatibus? Qui similique a tempora eum eaque aliquid tempore non rem, impedit ratione sint aut sequi, enim eos, est repellendus numquam delectus assumenda culpa deleniti doloremque dolorum obcaecati laboriosam quos? Unde blanditiis repudiandae sint omnis necessitatibus, quisquam exercitationem doloremque voluptatem qui nostrum sed minima facere eum ab voluptatibus ipsa quasi, id in molestias recusandae! Nostrum corrupti labore ab deleniti, libero amet nisi ullam ipsam natus nemo facere ea unde. Reprehenderit officia hic sint dolorum placeat facilis? Expedita ea itaque, atque voluptatum impedit ullam laboriosam, velit voluptatibus unde rerum ipsum exercitationem dignissimos. Esse, iusto! Sunt rem tenetur quidem harum temporibus reprehenderit repellendus suscipit soluta impedit doloribus eveniet, delectus cupiditate corrupti voluptatum officiis eos consequuntur dolor. Ut nemo, quibusdam eveniet odit quo accusantium, id dolorem eius nihil porro hic reprehenderit sit error, deserunt perspiciatis repudiandae numquam sapiente iste. Error maiores quidem perferendis ipsam esse? Totam officiis ad fugit. Inventore odit, minus consectetur tenetur sed dolorum excepturi temporibus dolorem quisquam repellendus magnam fugiat\n harum. Doloribus ipsum sequi necessitatibus blanditiis et repellendus consectetur atque ut natus.";
const sample2 = '<b>Here is the sub title</b><br><hr>&#8594; &nbsp;AA Lorem <div>ipsum</div>&#8594; &nbsp; dolor sit amet consectetur adipisicing elit. Distinctio, aperiam laudantium. Ipsam repellat eos vero a tempore numquam provident ill<br>&#8594; &nbsp;AA Lorem ipsum <br>&#8594; &nbsp; dolor sit amet consectetur adipisicing elit. Distinctio, aperiam laudantium. Ipsam repellat eos ve<br>AA Lorem ipsum <br>&#8594; &nbsp; dolor sit amet consectetur adipisicing elit. Distinctio, aperiam laudantium. Ipsam repellat eos vero a tempore numquam provident ill'
const data = {
  title_list : ['dolor sit amet consectetur adipisicing eli', 't. Distinctio, aperiam laudantium. Ipsam repellat eos vero a te', 't. Distinctio, aperiam laudantium. Ipsam repellat eos vero a te', 'Title4'],
  content_list : [sample2, sample_txt, sample_txt, sample_txt]
}

const app = () => {
  return (
    <>
        <Sidebar />
        {/* <VisitBlog data = {data}/> */}
    </>
  );
};

export default app;
