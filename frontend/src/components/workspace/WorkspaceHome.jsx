import * as React from 'react';
import { BarChart, PieChart, LineChart } from "@mui/x-charts"

export default function WorkspaceHome({workspaceName}) {
    return (
        <div className="workspace-home-container">
            <div className="header-container">
                <div className="workspace-header-home">
                    <div className="workspace-name-wrapper">
                        <h1 className="workspace-home">{workspaceName}</h1>
                    </div>
                </div>
                <div className="quick-action-buttons">
                    <button className="quick-action-button">Create Board</button>
                    <button className="quick-action-button">Create Task</button>
                    <button className="quick-action-button">Create Note</button>
                    <button className="quick-action-button">Create Event</button>
                    <button className="quick-action-button">Invite member</button>
                </div>
            </div>
            <div className="container">
                <div className="activity stat-card">
                    <h1>Activity</h1>
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                        series={[
                            {
                                data: [2, 5.5, 2, 8.5, 1.5, 5],
                            },
                        ]}
                        colors={['#906dc9']}
                        height={300}
                        sx={{ width: 1 }}
                    />
                </div>
                <div className="pie-chart stat-card">
                    <h1>Task Distribution</h1>
                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: 10, label: 'series A' },
                                    { id: 1, value: 15, label: 'series B' },
                                    { id: 2, value: 20, label: 'series C' },
                                ],
                            },
                        ]}
                        colors={['#906dc9', '#F76596', '#a68ad3']}
                        height={200}
                    />
                </div>
                <div className="member-activity stat-card">
                    <h1>Some</h1>
                    <BarChart
                        series={[
                            { data: [4, 2, 5, 4, 1], stack: 'A', label: 'Series A1' },
                            { data: [2, 8, 1, 3, 1], stack: 'A', label: 'Series A2' },
                            { data: [14, 6, 5, 8, 9], label: 'Series B1' },
                        ]}
                        barLabel={(item, context) => {
                            if ((item.value ?? 0) > 10) {
                                return 'High';
                            }
                            return context.bar.height < 60 ? null : item.value?.toString();
                        }}
                        colors={['#906dc9', '#F76596', '#a68ad3']}
                        height={350}
                    />
                </div>
            </div>
        </div>
    );
}