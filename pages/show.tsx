import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Flamingo } from "../utils/types"
import Link from "next/link"
import { useState } from 'react';

interface IndexProps {
  flamingos: Array<Flamingo>
}


function Show(props: IndexProps) {
  const { flamingos } = props

  return (
    <div>
      <h1>Flamingos!</h1>
      {flamingos.map(f => (
          <div className={styles.box} key={f.name}>
              <h2>Name: {f.name}</h2>
              <h5>Age: {f.age}</h5>
              <h5>Color: {f.color}</h5>
          </div>
      ))}
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

export default Show;
