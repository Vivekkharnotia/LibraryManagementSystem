import Typography from '@mui/material/Typography';
import React from 'react'
import visblog from './VisitBlog.module.css';
import BlogPartition from './BlogPartition/BlogPartition.js';
import {AiOutlineInstagram} from 'react-icons/ai';
import {CgFacebook} from 'react-icons/cg';
import {AiOutlineTwitter} from 'react-icons/ai'
import {MdOutlineEmail} from 'react-icons/md'
import Avatar from '@mui/material/Avatar';

export default function VisitBlog({data}) {
    let arr = [];
    for (let i = 0; i < data.title_list.length; i++) {
        arr[i] = 0;
        if(data.title_list[i].includes("<script>") || data.content_list[i].includes("<script>")){
            arr[i] = 1;
        }
    }
  return (
    <>
        <div className = {visblog.head}>
            <Typography variant='h3' sx = {{fontWeight : 'bolder'}} className = {visblog.title}>Want to Reduce Support Volume? Follow These 5 Steps</Typography>
            <div className={visblog.author}>
                <Avatar className = {visblog.authorAvatar} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCQaD1mEh95w9y6o_8eVSErM9mnbbRQUiCgw&usqp=CAU' sx = {{backgroundColor :'#1565c0'}} ></Avatar>
                <Typography variant='body1' sx = {{fontWeight : 'bold'}}>Written By Megan Kopalasingam &nbsp; &nbsp;</Typography>
                <Typography variant='body1'>February 16, 2023</Typography>
            </div>
        </div>

        <div className={visblog.image1}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMaJKOnh70m9VVMzrgdZY0jTGUfLSXFI01IQ&usqp=CAU" alt="" />
        </div>
        
        <div className = {visblog.container}>
            <ul className={visblog.anchors}>
                {
                    data.title_list.map((title, index) => {
                        if(arr[index] == 1) return (<></>);
                        return (<li key={`anchor${index}`}><a href = {`#anchor${index}`}>----{title}</a></li>);
                    })
                }
            </ul>
            <ul className={visblog.contact}>
            
                <li className = {visblog.fb}><CgFacebook className={visblog.icn} color='white'/></li>
                <li className = {visblog.fb}><AiOutlineTwitter className={visblog.icn} color='white'/></li>
                <li className = {visblog.fb}><AiOutlineInstagram  className={visblog.icn} color='white' /></li>
                <li className = {visblog.fb}><MdOutlineEmail  className={visblog.icn} color='white'/></li>
            </ul>
            
            <div className={visblog.content}>
                {
                    data.title_list.map((title, index) => {
                        if(arr[index] == 1) return (<></>);
                        return (<BlogPartition key = {`title${index}`} index={index} title={title} text={data.content_list[index]}/>)
                    })
                }
            </div>
            
        </div>
    </>
  )
}
