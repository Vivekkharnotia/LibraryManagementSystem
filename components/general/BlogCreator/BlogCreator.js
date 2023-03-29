import Typography from '@mui/material/Typography';
import React, { useEffect, useRef, useState } from 'react'
import style from './VisitBlog.module.css';
import BlogPartition from './BlogPartition/BlogPartition.js';
import {AiOutlineInstagram} from 'react-icons/ai';
import {CgFacebook} from 'react-icons/cg';
import {AiOutlineTwitter} from 'react-icons/ai'
import {MdOutlineEmail} from 'react-icons/md'
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';



export default function BlogCreator({data}) {
    const container = useRef(null);
    const [titles, setTitles] = useState([]);
    const [bold, setBold] = useState({});
    const [temp, setTemp] = useState("This is the temp string");
    const [block, setBlock] = useState([<BlogPartition anchorId='#anchor0' setBold={setBold} temp = {temp}/>]);
    
    useEffect(() => {
        const titles = block.map((item) => {
            return getTitle(item.props.anchorId);
        });
        setTitles(titles);

    }, [block]);


    const getTitle = (anchorId) => {
        const title = document.getElementById(`${anchorId}`);
        return title.children[0].innerText;
    }


    const handleParaClick = ()=>{
        const blockSize = block.length;
        console.log(block[0].props.anchorId);
        setBlock(current => [...current, <BlogPartition anchorId={`anchor${blockSize}`} setBold={setBold} temp={temp}/>])
    }


    const handleBoldClick = ()=>{
        const result = getString("hdskjhfdshfhhskhkjn", 2, 5);
        setTemp(result);
        
    }

    const getString = (str, start, end) => {
        let ret = "";
        // dgasd sasdjgadsh asduayduasyd
        for(let i = 0; i < str.length; i++){
            if(i == start){
                ret += "<b>" + str[i];
            }
            else if(i == end){
                ret += str[i] + "</b>";
            }
            else{
                ret += str[i];
            }
        }
        return ret;
    }


  return (
    <>
        <div className = {style.head}>
            <Typography variant='h3' sx = {{fontWeight : 'bolder'}} className = {style.title}>Want to Reduce Support Volume? Follow These 5 Steps</Typography>
            <div className={style.author}>
                <Avatar className = {style.authorAvatar} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCQaD1mEh95w9y6o_8eVSErM9mnbbRQUiCgw&usqp=CAU' sx = {{backgroundColor :'#1565c0'}} ></Avatar>
                <Typography variant='body1' sx = {{fontWeight : 'bold'}}>Written By Megan Kopalasingam &nbsp; &nbsp;</Typography>
                <Typography variant='body1'>February 16, 2023</Typography>
            </div>
        </div>

        <div className={style.image1}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMaJKOnh70m9VVMzrgdZY0jTGUfLSXFI01IQ&usqp=CAU" alt="" />
        </div>
        
        <div className = {style.container}>
            <ul className={style.anchors} style={{paddingLeft: '1.2rem'}}>
                {
                    titles.map((item, index) => {
                        return (<li key={index}><a href={"#" + block[index].props.anchorId}>----{item}</a></li>)
                    })
                }
            </ul>
            <ul className={style.contact}>

                <li className = {style.fb} onClick={handleParaClick}><Button className={style.addPara}>P</Button></li>
                <li className = {style.fb} onClick={handleBoldClick}>
                    <Button id='boldSample' className={style.addBold}>
                        <b>B</b>
                    </Button>
                </li>
                <li className = {style.fb}><AiOutlineInstagram  className={style.icn} color='white' /></li>
                <li className = {style.fb}><MdOutlineEmail  className={style.icn} color='white'/></li>
                
            </ul>
            
            <div className={style.content} ref={container}>
                
                {block}
                
            </div>
            
        </div>
    </>
  )
}
