import unittest
import requests
import json 

class CitasTests(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.url_register = "http://localhost:5000/citas/registrarCita"
        cls.url_erase = "http://localhost:5000/citas/eliminarCita"
        cls.url_login = "http://localhost:5000/api/login"

        cls.test_credentials = {
            "rut":"33333333-3",
            "password":"testing"
        }
        cls.valid_hora = {
            "rutPaciente":"21128959-7",
            "nombrePaciente":"Juan Cucurella",
            "maquinaId":"1",
            "fecha":"2024-05-14T12:30:00.000+00:00",
            "motivoEx":"Problemas de pulmón",
            "tipoEx":"Radiografía",
            "contacto":"+56985679123",
            "infoExtra":"alergia a antitusivos"
        }
        cls.invalid_hora_sin_rut = {
            "rutPaciente":"",
            "nombrePaciente":"Juan Cucurella",
            "maquinaId":"1",
            "fecha":"2024-05-14T12:30:00.000+00:00",
            "motivoEx":"Problemas de pulmón",
            "tipoEx":"Radiografía",
            "contacto":"+56985679123",
            "infoExtra":"alergia a antitusivos"
        }
        cls.invalid_hora_sin_nombre = {
            "rutPaciente":"21128959-7",
            "nombrePaciente":"",
            "maquinaId":"1",
            "fecha":"2024-05-14T12:30:00.000+00:00",
            "motivoEx":"Problemas de pulmón",
            "tipoEx":"Radiografía",
            "contacto":"+56985679123",
            "infoExtra":"alergia a antitusivos"
        }
        cls.invalid_hora_sin_maquina = {
            "rutPaciente":"21128959-7",
            "nombrePaciente":"Juan Cucurella",
            "maquinaId":"",
            "fecha":"2024-05-14T12:30:00.000+00:00",
            "motivoEx":"Problemas de pulmón",
            "tipoEx":"Radiografía",
            "contacto":"+56985679123",
            "infoExtra":"alergia a antitusivos"
        }
        cls.invalid_hora_sin_fecha = {
            "rutPaciente":"21128959-7",
            "nombrePaciente":"Juan Cucurella",
            "maquinaId":"1",
            "fecha":"",
            "motivoEx":"Problemas de pulmón",
            "tipoEx":"Radiografía",
            "contacto":"+56985679123",
            "infoExtra":"alergia a antitusivos"
        }
        cls.invalid_hora_sin_tipoexamen = {
            "rutPaciente":"21128959-7",
            "nombrePaciente":"Juan Cucurella",
            "maquinaId":"1",
            "fecha":"2024-05-14T12:30:00.000+00:00",
            "motivoEx":"Problemas de pulmón",
            "tipoEx":"",
            "contacto":"+56985679123",
            "infoExtra":"alergia a antitusivos"
        }
        cls.invalid_hora_rut_invalido_alfanum = {
            "rutPaciente":"asdSFSDHVC2598687245",
            "nombrePaciente":"Juan Cucurella",
            "maquinaId":"1",
            "fecha":"2024-05-14T12:30:00.000+00:00",
            "motivoEx":"Problemas de pulmón",
            "tipoEx":"Radiografía",
            "contacto":"+56985679123",
            "infoExtra":"alergia a antitusivos"
        }
        cls.invalid_hora_rut_invalido_nonalfanum = {
            "rutPaciente":"<script> alert(1) </script>",
            "nombrePaciente":"Juan Cucurella",
            "maquinaId":"1",
            "fecha":"2024-05-14T12:30:00.000+00:00",
            "motivoEx":"Problemas de pulmón",
            "tipoEx":"Radiografía",
            "contacto":"+56985679123",
            "infoExtra":"alergia a antitusivos"
        }
        cls.valid_hora_typo_tipoex = {
            "rutPaciente":"21128959-7",
            "nombrePaciente":"Juan Cucurella",
            "maquinaId":"1",
            "fecha":"2024-05-14T12:30:00.000+00:00",
            "motivoEx":"Problemas de pulmón",
            "tipoEx":"Radiografia",
            "contacto":"+56985679123",
            "infoExtra":"alergia a antitusivos"
        }
        cls.invalid_hora_rut_puntos = {
            "rutPaciente":"21.128.959-7",
            "nombrePaciente":"Juan Cucurella",
            "maquinaId":"1",
            "fecha":"2024-05-14T12:30:00.000+00:00",
            "motivoEx":"Problemas de pulmón",
            "tipoEx":"Radiografía",
            "contacto":"+56985679123",
            "infoExtra":"alergia a antitusivos"
        }

    @classmethod
    def tearDownClass(cls):
        del cls.valid_hora
        del cls.invalid_hora_rut_invalido_alfanum
        del cls.invalid_hora_rut_invalido_nonalfanum
        del cls.invalid_hora_sin_fecha
        del cls.invalid_hora_sin_maquina
        del cls.invalid_hora_sin_nombre
        del cls.invalid_hora_sin_rut
        del cls.invalid_hora_sin_tipoexamen

    def test_getmethod_nocredentials(self):
        response = requests.get(self.url_register, json=self.valid_hora)
        self.assertEqual("404", str(response.status_code))

    def test_getmethod_nocredentials(self):
        login_response = requests.post(self.url_login, json=self.test_credentials)
        data_login = login_response.json()
        print(data_login["token"])
        head = {'Authorization':'token {}'.format(data_login["token"])}
        response= requests.get(self.url_register, headers=head, json=self.valid_hora)

        self.assertEqual("404", str(response.status_code))

    def test_post_hora_nocredentials(self):
        response = requests.post(self.url_register, json=self.valid_hora)
        self.assertEqual("401",str(response.status_code))
    
    def test_registrar_hora_valida(self):
        #secuencia de login
        login_response = requests.post(self.url_login, json=self.test_credentials)
        data_login = login_response.json()
        print(data_login["token"])
        head = {'Authorization':'token {}'.format(data_login["token"])}

        response= requests.post(self.url_register, headers=head, json=self.valid_hora)

        data_response = response.json()
        self.assertEqual("201",str(response.status_code))
        self.assertEqual("cita registrada con exito",data_response["confirmacion"])

        erase_response = requests.delete(self.url_erase+"/"+str(data_response["id"]), headers=head)
        self.assertEqual("200",str(erase_response.status_code))

    def test_hora_norut(self):
        #secuencia de login
        login_response = requests.post(self.url_login, json=self.test_credentials)
        data_login = login_response.json()
        print(data_login["token"])
        head = {'Authorization':'token {}'.format(data_login["token"])}

        response = requests.post(self.url_register, headers=head, json=self.invalid_hora_sin_rut)
        data_response = response.json()

        self.assertEqual("500",str(response.status_code))
        self.assertEqual("error registrando cita", data_response["error"])

    
        #erase_response = requests.delete(self.url_erase+"/"+str(data_response["id"]), headers=head)
        #self.assertEqual("200",str(erase_response.status_code))

    def test_hora_noname(self):
        #secuencia de login
        login_response = requests.post(self.url_login, json=self.test_credentials)
        data_login = login_response.json()
        print(data_login["token"])
        head = {'Authorization':'token {}'.format(data_login["token"])}

        response = requests.post(self.url_register, headers=head, json=self.invalid_hora_sin_nombre)
        data_response = response.json()

        self.assertEqual("500",str(response.status_code))
        self.assertEqual("error registrando cita", data_response["error"])

    
        #erase_response = requests.delete(self.url_erase+"/"+str(data_response["id"]), headers=head)
        #self.assertEqual("200",str(erase_response.status_code))

    def test_hora_nomaquina(self):
        #secuencia de login
        login_response = requests.post(self.url_login, json=self.test_credentials)
        data_login = login_response.json()
        print(data_login["token"])
        head = {'Authorization':'token {}'.format(data_login["token"])}

        response = requests.post(self.url_register, headers=head, json=self.invalid_hora_sin_maquina)
        data_response = response.json()

        self.assertEqual("500",str(response.status_code))
        self.assertEqual("error registrando cita", data_response["error"])
    
        #erase_response = requests.delete(self.url_erase+"/"+str(data_response["id"]), headers=head)
        #self.assertEqual("200",str(erase_response.status_code))

    def test_hora_nofecha(self):
        #secuencia de login
        login_response = requests.post(self.url_login, json=self.test_credentials)
        data_login = login_response.json()
        print(data_login["token"])
        head = {'Authorization':'token {}'.format(data_login["token"])}

        response = requests.post(self.url_register, headers=head, json=self.invalid_hora_sin_fecha)
        data_response = response.json()

        self.assertEqual("500",str(response.status_code))
        self.assertEqual("error registrando cita", data_response["error"])

    
        #erase_response = requests.delete(self.url_erase+"/"+str(data_response["id"]), headers=head)
        #self.assertEqual("200",str(erase_response.status_code))

    def test_hora_notipoex(self):
        #secuencia de login
        login_response = requests.post(self.url_login, json=self.test_credentials)
        data_login = login_response.json()
        print(data_login["token"])
        head = {'Authorization':'token {}'.format(data_login["token"])}

        response = requests.post(self.url_register, headers=head, json=self.invalid_hora_sin_tipoexamen)
        data_response = response.json()

        self.assertEqual("500",str(response.status_code))
        self.assertEqual("error registrando cita", data_response["error"])

    
        #erase_response = requests.delete(self.url_erase+"/"+str(data_response["id"]), headers=head)
        #self.assertEqual("200",str(erase_response.status_code))

    def test_hora_rut_invalido_onlyalfanumerico(self):
        #secuencia de login
        login_response = requests.post(self.url_login, json=self.test_credentials)
        data_login = login_response.json()
        print(data_login["token"])
        head = {'Authorization':'token {}'.format(data_login["token"])}

        response = requests.post(self.url_register, headers=head, json=self.invalid_hora_rut_invalido_alfanum)
        data_response = response.json()

        self.assertEqual("500",str(response.status_code))
        self.assertEqual("error registrando cita", data_response["error"])

    
        erase_response = requests.delete(self.url_erase+"/"+str(data_response["id"]), headers=head)
        self.assertEqual("200",str(erase_response.status_code))

    def test_hora_rut_invalido_noalfanumerico(self):
        #secuencia de login
        login_response = requests.post(self.url_login, json=self.test_credentials)
        data_login = login_response.json()
        print(data_login["token"])
        head = {'Authorization':'token {}'.format(data_login["token"])}

        response = requests.post(self.url_register, headers=head, json=self.invalid_hora_rut_invalido_nonalfanum)
        data_response = response.json()

        self.assertEqual("500",str(response.status_code))
        self.assertEqual("error registrando cita", data_response["error"])

    
        erase_response = requests.delete(self.url_erase+"/"+str(data_response["id"]), headers=head)
        self.assertEqual("200",str(erase_response.status_code))

    def test_hora_typo_tipoex(self):
        login_response = requests.post(self.url_login, json=self.test_credentials)
        data_login = login_response.json()
        print(data_login["token"])
        head = {'Authorization':'token {}'.format(data_login["token"])}

        response = requests.post(self.url_register, headers=head, json=self.valid_hora_typo_tipoex)
        data_response = response.json()
        self.assertEqual("201",str(response.status_code))
        self.assertEqual("cita registrada con exito",data_response["confirmacion"])

        erase_response = requests.delete(self.url_erase+"/"+str(data_response["id"]), headers=head)
        self.assertEqual("200",str(erase_response.status_code))

    def test_hora_rut_puntos(self):
        #secuencia de login
        login_response = requests.post(self.url_login, json=self.test_credentials)
        data_login = login_response.json()
        print(data_login["token"])
        head = {'Authorization':'token {}'.format(data_login["token"])}

        response = requests.post(self.url_register, headers=head, json=self.invalid_hora_rut_puntos)
        data_response = response.json()

        self.assertEqual("500",str(response.status_code))
        self.assertEqual("error registrando cita", data_response["error"])

    
        erase_response = requests.delete(self.url_erase+"/"+str(data_response["id"]), headers=head)
        self.assertEqual("200",str(erase_response.status_code))

if __name__ == '__main__':
    unittest.main()