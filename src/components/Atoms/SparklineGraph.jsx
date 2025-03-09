import React from "react";
import { Link } from 'gatsby';
import { LineChart, Line, ResponsiveContainer } from "recharts";

export const SparklineGraph = ({ data, width = 100, height = 30, link, fadein }) => {
    if (!data || data.length === 0) return null;

    // Determine the color based on trend
    const color = data[data.length - 1].y >= data[0].y ? "#28a745" : "#dc3545";

    return (
        <div style={{ cursor: 'pointer', width, height }}>
            <Link to={`/items/${link}`}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        {/* Define a gradient for the line when fadein is true */}
                        {fadein && (
                            <defs>
                                <linearGradient id={`fadeGradient-${link}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor={color} stopOpacity={0} />
                                    <stop offset="50%" stopColor={color} stopOpacity={1} />
                                    <stop offset="100%" stopColor={color} stopOpacity={1} />
                                </linearGradient>
                            </defs>
                        )}
                        <Line
                            type="monotone"
                            dataKey="y"
                            stroke={fadein ? `url(#fadeGradient-${link})` : color}
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Link>
        </div>
    );
};
