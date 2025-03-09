import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

export const SparklineGraph = ({ data, width = 100, height = 30 }) => {
    if (!data || data.length === 0) return null;

    // Determine trend direction (green for up, red for down)
    const color = data[data.length - 1].y >= data[0].y ? "#28a745" : "#dc3545";

    return (
        <div style={{ width, height }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <Line type="monotone" dataKey="y" stroke={color} strokeWidth={2} dot={false} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
