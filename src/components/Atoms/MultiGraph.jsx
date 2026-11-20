import React, { useEffect, useMemo, useState } from 'react'
import { Button, Stack } from 'react-bootstrap'
import { HighchartsReact } from 'highcharts-react-official'
import Highcharts from 'highcharts/highstock'
import { useTranslations } from '../../context/TranslationsContext'
import { Typography } from '../Atoms'


export const normalizeSeriesToPercent = (seriesData) => seriesData.map(series => {
    const basePoint = series.data.find(point => Number.isFinite(point.y) && point.y > 0);

    if (!basePoint) return { ...series, data: [] };

    return {
        ...series,
        data: series.data.map(point => ({
            ...point,
            rawPrice: point.y,
            y: ((point.y / basePoint.y) - 1) * 100,
        })),
    };
});

export const MultiGraph = ({ seriesData }) => {
    const { t } = useTranslations();
    const [displayMode, setDisplayMode] = useState('price');
    const percentageMode = displayMode === 'percentage';
    const displayedSeries = useMemo(
        () => percentageMode ? normalizeSeriesToPercent(seriesData) : seriesData,
        [percentageMode, seriesData]
    );
    
    useEffect(() => {
        Highcharts.setOptions({
            lang: {
                months: [t('january'), t('february'), t('march'), t('april'), t('may'), t('june'), t('july'), t('august'), t('september'), t('october'), t('november'), t('december')],
                shortMonths: [t('jan'), t('feb'), t('mar'), t('apr'), t('may'), t('jun'), t('jul'), t('aug'), t('sep'), t('oct'), t('nov'), t('dec')],
                numericSymbols: undefined,
            },
            rangeSelector: {
                selected: 2 //6 months
            }
        });
    }, [seriesData]);

    if (seriesData.length === 0) {
        return (<Typography>{t("no results found...")}</Typography>)
    } else {
        return (
            <>
                <Stack direction="horizontal" gap={2} className="mb-2">
                    <span>Display:</span>
                    <Button
                        size="sm"
                        variant={percentageMode ? 'outline-info' : 'info'}
                        aria-pressed={!percentageMode}
                        onClick={() => setDisplayMode('price')}
                    >
                        Price
                    </Button>
                    <Button
                        size="sm"
                        variant={percentageMode ? 'info' : 'outline-info'}
                        aria-pressed={percentageMode}
                        onClick={() => setDisplayMode('percentage')}
                    >
                        % Change
                    </Button>
                </Stack>
                <HighchartsReact
                    highcharts={Highcharts}
                    options={{
                    styledMode: true,
                    // Better colors because the default colors don't have enough contrast on dark mode
                    colors: ['#058DC7', '#50B432', '#ED561B', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
                    credits: false,
                    scrollbar: {
                        enabled: false
                    },
                    yAxis: [{
                        labels: {
                            align: 'right',
                            x: -3,
                            format: percentageMode ? '{value:.0f}%' : undefined,
                        },
                        title: {
                            text: percentageMode ? '% change' : t('price')
                        },
                        plotLines: percentageMode ? [{
                            value: 0,
                            color: '#888888',
                            dashStyle: 'ShortDash',
                            width: 1,
                        }] : [],
                        height: '100%',
                        lineWidth: 2,
                        resize: {
                            enabled: true
                        }
                    }],
                    tooltip: {
                        backgroundColor: "var(--background-color)",
                        split: true,
                        xDateFormat: '%Y-%m-%d',
                        shared: true,
                        pointFormatter: function () {
                            if (percentageMode) {
                                const sign = this.y > 0 ? '+' : '';
                                return `${this.series.name}: <b>${sign}${Highcharts.numberFormat(this.y, 2)}%</b> (${Highcharts.numberFormat(this.options.rawPrice, 0)})<br/>`;
                            }
                            return `${this.series.name}: <b>${Highcharts.numberFormat(this.y, 0)}</b><br/>`;
                        },
                    },
                    rangeSelector: {
                        buttons: [{
                            type: 'month',
                            count: 1,
                            text: t('1m')
                        }, {
                            type: 'month',
                            count: 3,
                            text: t('3m')
                        }, {
                            type: 'month',
                            count: 6,
                            text: t('6m')
                        }, {
                            type: 'ytd',
                            text: t('ytd')
                        }, {
                            type: 'year',
                            count: 1,
                            text: t('1y')
                        }, {
                            type: 'all',
                            text: t('all')
                        }],
                    },
                    plotOptions: {
                        area: {
                            stacking: 'percentage',
                            lineColor: '#666666',
                            lineWidth: 1,
                            marker: {
                                lineWidth: 1,
                                lineColor: '#666666'
                            }
                        },
                        series: {
                            turboThreshold: 0,
                        }
                    },
                    series: displayedSeries,
                    }}
                    constructorType={"stockChart"}
                />
            </>
        )
    }
}
