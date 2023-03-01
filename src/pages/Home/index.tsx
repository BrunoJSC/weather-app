import axios from "axios";

import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text } from "react-native";
import { Box, Button, HomeContainer, Input, Temp, Title } from "./styles";

interface WeatherData {
  temperature: number;

  description: string;
  city: string;
  country: string;
  date: string;
  icons: string;
}

const ColorScheme = {
  cold: "#6495ED",
  cool: "#ADD8E6",
  warm: "#FFA500",
  hot: "#FF4500",
};

const ColorsSchemeDay = {
  morning: "#fde047",
  even: "#0284c7",
  night: "#1d4ed8",
};

export function Home() {
  const [data, setData] = useState<WeatherData>();
  const [info, setInfo] = useState("São Paulo");
  const [loading, setLoading] = useState<boolean>(false);
  const [day, setDay] = useState<Date>(new Date());

  async function fetchData() {
    if (info?.trim() !== "") {
      setLoading(true);
      try {
        await axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?q=${info}&units=metric&appid=d9ceb6f8ea31efcfb7056c47586f83a3&lang=pt_br`
          )
          .then((response) => {
            const { main, weather, name, sys } = response.data;
            const temperature = main.temp;

            const description = weather[0].description;
            const city = name;
            const country = sys.country;
            const icons = weather[0].icon;
            const date = new Date().toLocaleDateString();

            setData({
              temperature,
              description,
              city,
              country,
              icons,
              date,
            });
          });
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const TemperatureColors = [
    { min: -15, max: 17, color: ColorScheme.cold },
    { min: 18, max: 29, color: ColorScheme.cool },
    { min: 30, max: 37, color: ColorScheme.warm },
    { min: 38, max: 45, color: ColorScheme.hot },
  ];

  function getTemperature(temperature: any) {
    for (let i = 0; i < TemperatureColors.length; i++) {
      if (
        temperature >= Number(TemperatureColors[i].min) &&
        temperature <= Number(TemperatureColors[i].max)
      ) {
        return TemperatureColors[i].color;
      }
    }
    return ColorScheme.hot;
  }

  function getDay(day: any) {
    if (day >= 7 && day <= 12) {
      return ColorsSchemeDay.morning;
    } else if (day >= 13 && day <= 17) {
      return ColorsSchemeDay.even;
    } else if (day >= 18) {
      return ColorsSchemeDay.night;
    }
    setDay(day);
  }

  const temperatureColor = data?.temperature
    ? getTemperature(data.temperature)
    : ColorScheme.hot;

  const hours = day?.getHours();
  const temps = hours ? getDay(hours) : "white";

  console.log(new Date().getTime());

  return (
    <HomeContainer style={{ backgroundColor: temps }}>
      <Box>
        <Input value={info} onChangeText={(text) => setInfo(text)} />
        <Button onPress={() => fetchData()}>
          {loading ? <ActivityIndicator /> : <Text>Buscar</Text>}
        </Button>
      </Box>
      <Title>{data?.city}</Title>
      {info && (
        <>
          <Text>{data?.temperature} ºC</Text>
          <Text>{data?.date}</Text>
        </>
      )}
      <Temp>
        <Image
          source={{ uri: `http://openweathermap.org/img/w/${data?.icons}.png` }}
          style={{
            width: 50,
            height: 50,
            backgroundColor: temperatureColor,
            borderRadius: 50,
          }}
        />
        <Text>{data?.description}</Text>
      </Temp>
    </HomeContainer>
  );
}
