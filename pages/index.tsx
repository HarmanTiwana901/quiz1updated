import type { NextPage } from 'next'
import { useRouter } from "next/router"
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Flamingo } from "../utils/types"
import Link from "next/link"
import { useState } from 'react';

interface IndexProps {
  flamingos: Array<Flamingo>
}


function Home(props: IndexProps) {
  const { flamingos } = props
  const router = useRouter()
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [age, setAge] = useState('');

  const nameChange = (e: {target: {value: any; }}) => {
    const value = e.target.value;
    setName(value);
  }
  
  const colorChange = (e: {target: {value: any; }}) => {
    const value = e.target.value;
    setColor(value);
  }

  const ageChange = (e: {target: {value: any; }}) => {
    const value = e.target.value;
    setAge(value);
  }

  const create = () => {
      // create a piece of data
      let flamingo = { name: name, color: color, age: age}
      fetch("http://localhost:3000/api/flamingo", 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(flamingo)
        }
        );
        alert("Flamingo " + name + " Created!");
  }



  return (
    <div>
      <h1>Create Flamingo</h1>
      <input type="text" onChange={nameChange} placeholder="Name"></input><br/>
      <input type="text" onChange={ageChange} placeholder="Age"></input><br/>
      <input type="text" onChange={colorChange} placeholder="Color"></input><br/>
      <button onClick={create} type="button">Create</button>

      <button onClick={() => router.push('/show')}>View Flamingos</button>
      
    </div> 
  )
}

export async function getServerSideProps() {
  // get todo data from API
  const res = await fetch(process.env.API_URL as string)
  const flamingos = await res.json()

  // return props
  return {
    props: { flamingos },
  }
}

export default Home;
