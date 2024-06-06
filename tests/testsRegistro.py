import unittest
import requests
import json 

class RegistroTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.base_url = "http://localhost:5000/api/registrar"
        cls.delete_url = "http://localhost:5000/api/eliminarUser"
        cls.url_login = "http://localhost:5000/api/login"
        cls.test_credentials = {
            "rut":"33333333-3",
            "password":"testing"
        }
        cls.valid_user_noadmin = {
            "rut":"20459522-1",
            "password":"t3st1ngp4ssw0rd",
            "nombre":"Usuario Testing",
            "isAdmin":"0"
        }
        cls.valid_user_admin = {
            "rut":"21928342-2",
            "password":"t3st1ngp4ssw0rd",
            "nombre":"Usuario Testing",
            "isAdmin":"1"
        }
        cls.invalid_user_norut = {
            "rut":"",
            "password":"t3st1ngp4ssw0rd",
            "nombre":"Usuario Testing",
            "isAdmin":"1"
        }
        cls.invalid_user_nopwd = {
            "rut":"21029931-3",
            "password":"",
            "nombre":"Usuario Testing",
            "isAdmin":"1"
        }
        cls.invalid_user_noname = {
            "rut":"20459522-4",
            "password":"t3st1ngp4ssw0rd",
            "nombre":"",
            "isAdmin":"1"
        }
        cls.invalid_user_nobool = {
            "rut":"20410222-5",
            "password":"t3st1ngp4ssw0rd",
            "nombre":"Usuario Testing",
            "isAdmin":""
        }
        cls.invalid_user_rut_alfanum = {
            "rut":"ajsk1c43osjf-12421",
            "password":"t3st1ngp4ssw0rd",
            "nombre":"Usuario Testing",
            "isAdmin":"1"
        }
        cls.invalid_user_rut_nonalfanum = {
            "rut":"%29412kfnais-#$/",
            "password":"t3st1ngp4ssw0rd",
            "nombre":"Usuario Testing",
            "isAdmin":"1"
        }
        cls.invalid_user_name_nonalfanum = {
            "rut":"20459522-6",
            "password":"t3st1ngp4ssw0rd",
            "nombre":"<script> alert(1) </script>",
            "isAdmin":"1"
        }
        cls.invalid_user_long_rut = {
            "rut":"204595132509350124096856025328-1345678924758723465825456789876543234938947398676532886729837529735",
            "password":"t3st1ngp4ssw0rd",
            "nombre":"Usuario Testing",
            "isAdmin":"1"
        }
        cls.invalid_user_long_password = {
            "rut":"20459522-7",
            "password":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb222222222222222222222222222222299999999999999999999999999999999999999999999999999999999999111111111111111111111111jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
            "nombre":"Usuario Testing",
            "isAdmin":"1"
        }
        cls.invalid_user_long_name = {
            "rut":"20459522-8",
            "password":"t3st1ngp4ssw0rd",
            "nombre":"usuariooooooooooooooooooooo testiiiiiiiiiiiiiiiinnnnnnnnnnnngggggggggggggggggggggggggggggggggggggggggggggg usuariooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo",
            "isAdmin":"1"
        }

    @classmethod
    def tearDownClass(cls):
        login_response = requests.post(cls.url_login, json=cls.test_credentials)
        data_login = login_response.json()
        print(data_login["token"])
        head = {'Authorization':'token {}'.format(data_login["token"])}
        r = requests.post(cls.delete_url, headers=head, json={"rut":"21928342-2"})
        r = requests.post(cls.delete_url, headers=head, json={"rut":"204595132509350124096856025328-1345678924758723465825456789876543234938947398676532886729837529735"})
        r = requests.post(cls.delete_url, headers=head, json={"rut":"%29412kfnais-#$/"})
        r = requests.post(cls.delete_url, headers=head, json={"rut":"20459522-8"})
        r = requests.post(cls.delete_url, headers=head, json={"rut":"20459522-3"})
        r = requests.post(cls.delete_url, headers=head, json={"rut":"ajsk1c43osjf-12421"})
        r = requests.post(cls.delete_url, headers=head, json={"rut":"21029931-3"})
        r = requests.post(cls.delete_url, headers=head, json={"rut":"20410222-5"})
        
        del cls.test_credentials
        del cls.valid_user_admin
        del cls.valid_user_noadmin
        del cls.invalid_user_long_name
        del cls.invalid_user_long_password
        del cls.invalid_user_long_rut
        del cls.invalid_user_name_nonalfanum
        del cls.invalid_user_nobool
        del cls.invalid_user_nopwd
        del cls.invalid_user_noname
        del cls.invalid_user_norut
        del cls.invalid_user_rut_alfanum

        

    def test_get_method(self):
        response = requests.get(self.base_url, json=self.valid_user_admin)
        self.assertEqual("404",str(response.status_code))

    def test_registrar_usuario_admin(self):
        login_response = requests.post(self.url_login, json=self.test_credentials)
        data_login = login_response.json()
        print(data_login["token"])
        head = {'Authorization':'token {}'.format(data_login["token"])}

        response = requests.post(self.base_url, json=self.valid_user_admin)
        self.assertEqual("201",str(response.status_code))
        data_response = response.json()
        self.assertEqual("registro exitoso",data_response["message"])

        response_rollback = requests.post(self.delete_url, headers=head, json={"rut":"20459522-2"})
        self.assertEqual("200", str(response_rollback.status_code))

    def test_registrar_usuario_nonadmin(self):
        login_response = requests.post(self.url_login, json=self.test_credentials)
        data_login = login_response.json()
        print(data_login["token"])
        head = {'Authorization':'token {}'.format(data_login["token"])}

        response = requests.post(self.base_url, json=self.valid_user_noadmin)
        self.assertEqual("201",str(response.status_code))
        data_response = response.json()
        self.assertEqual("registro exitoso",data_response["message"])

        response_rollback = requests.post(self.delete_url, headers=head, json={"rut":"20459522-1"})
        self.assertEqual("200", str(response_rollback.status_code))

    def test_user_norut(self):
        login_response = requests.post(self.url_login, json=self.test_credentials)
        data_login = login_response.json()
        print(data_login["token"])
        head = {'Authorization':'token {}'.format(data_login["token"])}

        response = requests.post(self.base_url, json=self.invalid_user_norut)
        self.assertEqual("500",str(response.status_code))
        data_response = response.json()
        self.assertEqual("error guardando",data_response["message"])

        #response_rollback = requests.post(self.delete_url, headers=head, json={"rut":"20459528-1"})
        #self.assertEqual("200", str(response_rollback.status_code))

    def test_user_nopassword(self):
        login_response = requests.post(self.url_login, json=self.test_credentials)
        data_login = login_response.json()
        print(data_login["token"])
        head = {'Authorization':'token {}'.format(data_login["token"])}

        response = requests.post(self.base_url, json=self.invalid_user_nopwd)
        self.assertEqual("500",str(response.status_code))
        data_response = response.json()
        self.assertEqual("error guardando",data_response["message"])

    def test_user_noname(self):
        login_response = requests.post(self.url_login, json=self.test_credentials)
        data_login = login_response.json()
        print(data_login["token"])
        head = {'Authorization':'token {}'.format(data_login["token"])}

        response = requests.post(self.base_url, json=self.invalid_user_noname)
        self.assertEqual("500",str(response.status_code))
        data_response = response.json()
        self.assertEqual("error guardando",data_response["message"])

    def test_user_nobool(self):
        login_response = requests.post(self.url_login, json=self.test_credentials)
        data_login = login_response.json()
        print(data_login["token"])
        head = {'Authorization':'token {}'.format(data_login["token"])}

        response = requests.post(self.base_url, json=self.invalid_user_nopwd)
        self.assertEqual("500",str(response.status_code))
        data_response = response.json()
        self.assertEqual("error guardando",data_response["message"])

    def test_invalid_rut_alfanum(self):
        login_response = requests.post(self.url_login, json=self.test_credentials)
        data_login = login_response.json()
        print(data_login["token"])
        head = {'Authorization':'token {}'.format(data_login["token"])}

        response = requests.post(self.base_url, json=self.invalid_user_rut_alfanum)
        self.assertEqual("500",str(response.status_code))
        data_response = response.json()
        self.assertEqual("error guardando",data_response["message"])

        # response_rollback = requests.post(self.delete_url, headers=head, json={"rut":"ajsk1c43osjf-12421"})
        # self.assertEqual("200", str(response_rollback.status_code))

    def test_invalid_rut_nonalfanum(self):
        login_response = requests.post(self.url_login, json=self.test_credentials)
        data_login = login_response.json()
        print(data_login["token"])
        head = {'Authorization':'token {}'.format(data_login["token"])}

        response = requests.post(self.base_url, json=self.invalid_user_rut_nonalfanum)
        self.assertEqual("500",str(response.status_code))
        data_response = response.json()
        self.assertEqual("error guardando",data_response["message"])

        # response_rollback = requests.post(self.delete_url, headers=head, json={"rut":"%29412kfnais-#$/"})
        # self.assertEqual("200", str(response_rollback.status_code))
        
    def test_invalid_name_nonalfanum(self):
        login_response = requests.post(self.url_login, json=self.test_credentials)
        data_login = login_response.json()
        print(data_login["token"])
        head = {'Authorization':'token {}'.format(data_login["token"])}

        response = requests.post(self.base_url, json=self.invalid_user_name_nonalfanum)
        self.assertEqual("500",str(response.status_code))
        data_response = response.json()
        self.assertEqual("error guardando",data_response["message"])

        # response_rollback = requests.post(self.delete_url, headers=head, json={"rut":"20459528-1"})
        # self.assertEqual("200", str(response_rollback.status_code))

    def test_invalid_long_rut(self):
        login_response = requests.post(self.url_login, json=self.test_credentials)
        data_login = login_response.json()
        print(data_login["token"])
        head = {'Authorization':'token {}'.format(data_login["token"])}

        response = requests.post(self.base_url, json=self.invalid_user_long_rut)
        self.assertEqual("500",str(response.status_code))
        data_response = response.json()
        self.assertEqual("error guardando",data_response["message"])

        # Rollback en caso de no estar implementado
        # response_rollback = requests.post(self.delete_url, headers=head, json={"rut":"204595132509350124096856025328-1345678924758723465825456789876543234938947398676532886729837529735"})
        # self.assertEqual("200", str(response_rollback.status_code))

    def test_invalid_long_name(self):
        login_response = requests.post(self.url_login, json=self.test_credentials)
        data_login = login_response.json()
        print(data_login["token"])
        head = {'Authorization':'token {}'.format(data_login["token"])}

        response = requests.post(self.base_url, json=self.invalid_user_long_name)
        self.assertEqual("500",str(response.status_code))
        data_response = response.json()
        self.assertEqual("error guardando",data_response["message"])

        # Rollback en caso de no estar implementado
        # response_rollback = requests.post(self.delete_url, headers=head, json={"rut":"20459522-8"})
        # self.assertEqual("200", str(response_rollback.status_code))

    def test_invalid_long_password(self):
        login_response = requests.post(self.url_login, json=self.test_credentials)
        data_login = login_response.json()
        print(data_login["token"])
        head = {'Authorization':'token {}'.format(data_login["token"])}

        response = requests.post(self.base_url, json=self.invalid_user_long_password)
        self.assertEqual("500",str(response.status_code))
        data_response = response.json()
        self.assertEqual("error guardando",data_response["message"])
        
        # Rollback en caso de no estar implementado
        # response_rollback = requests.post(self.delete_url, headers=head, json={"rut":"20459522-7"})
        # self.assertEqual("200", str(response_rollback.status_code))