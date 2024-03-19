import React from 'react'
import { Card, Table, Typography } from '../Atoms'
import { useTranslations } from '../../context/TranslationsContext'

export const RegionsLevelCap = () => {
    const { t } = useTranslations()
    return (
        <Card className="pb-0">
            <Typography as="h5">Regions level cap</Typography>
            <Table size='sm' striped="columns" responsive>
                <thead>
                    <tr>
                        <th> </th>
                        <th>{t('Kanto')}</th>
                        <th>{t('Johto')}</th>
                        <th>{t('Hoenn')}</th>
                        <th>{t('Sinnoh')}</th>
                        <th>{t('Unova')}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{t('Before 1st Gym')}</td>
                        <td>20</td>
                        <td>20</td>
                        <td>20</td>
                        <td>20</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td>{t('Before 2nd Gym')}</td>
                        <td>26</td>
                        <td>24</td>
                        <td>24</td>
                        <td>27</td>
                        <td>24</td>
                    </tr>
                    <tr>
                        <td>{t('Before 3rd Gym')}</td>
                        <td>32</td>
                        <td>29</td>
                        <td>28</td>
                        <td>29</td>
                        <td>27</td>
                    </tr>
                    <tr>
                        <td>{t('Before 4th Gym')}</td>
                        <td>37</td>
                        <td>32</td>
                        <td>33</td>
                        <td>34</td>
                        <td>31</td>
                    </tr>
                    <tr>
                        <td>{t('Before 5th Gym')}</td>
                        <td>46</td>
                        <td>37</td>
                        <td>35</td>
                        <td>37</td>
                        <td>35</td>
                    </tr>
                    <tr>
                        <td>{t('Before 6th Gym')}</td>
                        <td>47</td>
                        <td>39</td>
                        <td>38</td>
                        <td>43</td>
                        <td>38</td>
                    </tr>
                    <tr>
                        <td>{t('Before 7th Gym')}</td>
                        <td>50</td>
                        <td>41</td>
                        <td>44</td>
                        <td>46</td>
                        <td>43</td>
                    </tr>
                    <tr>
                        <td>{t('Before 8th Gym')}</td>
                        <td>55</td>
                        <td>46</td>
                        <td>48</td>
                        <td>52</td>
                        <td>46</td>
                    </tr>
                    <tr>
                        <td>{t('Before E4')}</td>
                        <td>62</td>
                        <td>48 | 55</td>
                        <td>58</td>
                        <td>60</td>
                        <td>56</td>
                    </tr>
                    <tr>
                        <td>{t('After E4')}</td>
                        <td>100</td>
                        <td>100</td>
                        <td>100</td>
                        <td>100</td>
                        <td>100</td>
                    </tr>
                </tbody>
            </Table>
        </Card>
    )
}
