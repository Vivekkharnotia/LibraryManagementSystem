import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { CgFacebook } from 'react-icons/cg';
import { MdOutlineEmail } from 'react-icons/md';
import BlogPartition from './BlogPartition/BlogPartition';
import visblog from './VisitBlog.module.css';

export default function VisitBlog({data}) {


    return (
    <>
        <div className = {visblog.head}>
            <Typography variant='h3' sx = {{fontWeight : 'bolder'}} className = {visblog.title}>{data.headTitle}</Typography>
            <div className={visblog.author}>
                <Avatar className = {visblog.authorAvatar} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCQaD1mEh95w9y6o_8eVSErM9mnbbRQUiCgw&usqp=CAU' sx = {{backgroundColor :'#1565c0'}} ></Avatar>
                <Typography variant='body1' sx = {{fontWeight : 'bold'}}>Written By {data.displayName} &nbsp; &nbsp;</Typography>
                <Typography variant='body1'>February 16, 2023</Typography>
            </div>
        </div>

        <div className={visblog.image1}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMaJKOnh70m9VVMzrgdZY0jTGUfLSXFI01IQ&usqp=CAU" alt="" />
        </div>
        
        <div className = {visblog.container}>
            <ul className={visblog.anchors}>
                {
                    data.blogData.map((content, index) => {
                        return (<li key={`anchor${index}`}><a href = {`#anchor${index}`}>----{content.title}</a></li>);
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
                    data.blogData.map((content, index) => {
                        return (<BlogPartition key = {`title${index}`} index={index} title={content.title} text={content.content}/>)
                    })
                }
            </div>
            
        </div>
    </>
  )
}
