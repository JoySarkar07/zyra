import React from 'react';
import '../styles/web/Card.scss';
export interface CardProps {
    title?: string;
    children?: React.ReactNode;
    width?: string;
    elevation?: 'low' | 'medium' | 'high';
}
declare const Card: React.FC<CardProps>;
export default Card;
