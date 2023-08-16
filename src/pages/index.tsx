import classNames from 'classnames';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Home = () => {
  type stepType = 'introduction' | 'password';
  type themeType = 'light' | 'dracula';

  const [step, setStep] = useState<stepType>('introduction');
  const [charactersLength, setCharactersLength] = useState<string>('8');
  const [capitalLetters, setCapitalLetters] = useState<boolean>(false);
  const [lowerCase, setLowerCase] = useState<boolean>(false);
  const [numbers, setNumbers] = useState<boolean>(false);
  const [specialCharacters, setSpecialCharacters] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [activeAnimation, setActiveAnimation] = useState(false);
  const [passwordCopied, setPasswordCopied] = useState(false);
  const [theme, setTheme] = useState<themeType>('light');

  const copyContent = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setPasswordCopied(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const generateRandomString = () => {
    setPassword('');

    let characters = '';
    let result = '';

    if (capitalLetters) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowerCase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) characters += '0123456789';
    if (specialCharacters) characters += '!@#$%^&*()_+{}[]|;:,.<>?';

    for (let i = 0; i < Number(charactersLength); i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    setActiveAnimation(true);

    setTimeout(() => {
      if (result) setPassword(result);
      setActiveAnimation(false);
    }, 1000);
  };

  const disableSubmit = !!(
    capitalLetters ||
    lowerCase ||
    numbers ||
    specialCharacters
  );

  const teste = () => {
    if (theme === 'light') setTheme('dracula');
    if (theme === 'dracula') setTheme('light');
  };

  useEffect(() => {
    const xx = document.getElementById('html');
    xx?.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className='overflow-x-hidden flex justify-center'>
      <button
        className='btn btn-circle fixed top-4 right-4'
        onClick={() => teste()}
      >
        <Image
          src={theme === 'light' ? '/images/moon.svg' : '/images/sun.svg'}
          width={20}
          height={20}
          quality={100}
          alt='Copiar senha'
        />
      </button>

      {step === 'introduction' && (
        <div className=' hero min-h-screen'>
          <div className='hero-content text-center'>
            <div className='max-w-2xl'>
              <h1 className='text-5xl font-bold'>Gerador de Senhas</h1>
              <p className='py-6 text-lg'>
                Bem-vindo ao seu gerador de senhas! aqui você pode personalizar
                suas senhas com total de caracteres, letras maiúsculas e
                minusculas e caracteres espciais! sinta-se livre para
                experimentar a seguraça!
              </p>
              <button className='btn' onClick={() => setStep('password')}>
                Iniciar!
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 'password' && (
        <div className='hero min-h-screen '>
          <div className='hero-content text-center p-0'>
            <div className='max-w-5xl	w-screen flex flex-col items-center gap-4'>
              <h1 className='text-5xl font-bold'>Gerador de Senhas</h1>

              <div className='flex justify-center w-full relative items-center flex-wrap'>
                <div
                  className={classNames(
                    'fireworks-animation fireworks-animation-medium',
                    { 'fireworks-animation-medium--active': activeAnimation }
                  )}
                />

                <span
                  className={classNames(
                    'flex items-center justify-center h-16 w-fit	break-all py-2 text-3xl	 sm:text-4xl z-10	subpixel-antialiased font-bold',
                    { 'opacity-1': password, 'opacity-0': !password }
                  )}
                >
                  {password}
                </span>

                {password && (
                  <div
                    className='tooltip tooltip-right'
                    data-tip={
                      passwordCopied ? 'Senha copiada!' : 'Copiar senha'
                    }
                  >
                    <button
                      className='btn btn-primary btn-circle sm:ml-4'
                      onClick={() => copyContent()}
                      onMouseLeave={() => setPasswordCopied(false)}
                    >
                      <Image
                        src='/images/copied-icon.svg'
                        width={22}
                        height={20}
                        quality={100}
                        alt='Copiar senha'
                      />
                    </button>
                  </div>
                )}
              </div>

              <div className='flex flex-wrap justify-between gap-8 items-center px-4 w-full md:w-8/12 lg:w-6/12'>
                <span className='text-2xl text-left	subpixel-antialiased font-semibold'>
                  Comprimento
                </span>
                <div className='flex items-center w-44 md:w-64 justify-between'>
                  <input
                    type='range'
                    min='8'
                    max='30'
                    value={charactersLength}
                    onChange={(event) =>
                      setCharactersLength(event.target.value)
                    }
                    className='range range-primary w-32 md:w-48'
                  />
                  <span className='text-2xl	subpixel-antialiased font-semibold'>
                    {charactersLength}
                  </span>
                </div>
              </div>

              <div className='flex justify-between gap-8 items-center px-4 w-full md:w-8/12 lg:w-6/12'>
                <span className='text-2xl text-left	subpixel-antialiased font-semibold'>
                  Letras maiúsculas
                </span>

                <input
                  type='checkbox'
                  checked={capitalLetters}
                  onChange={() => setCapitalLetters(!capitalLetters)}
                  className='toggle toggle-primary'
                />
              </div>

              <div className='flex justify-between gap-8 items-center px-4	w-full md:w-8/12 lg:w-6/12'>
                <span className='text-2xl text-left	subpixel-antialiased font-semibold'>
                  Letras minúsculas
                </span>

                <input
                  type='checkbox'
                  checked={lowerCase}
                  onChange={() => setLowerCase(!lowerCase)}
                  className='toggle toggle-primary'
                />
              </div>

              <div className='flex justify-between gap-8 items-center px-4	w-full md:w-8/12 lg:w-6/12'>
                <span className='text-2xl text-left	subpixel-antialiased font-semibold'>
                  Números
                </span>

                <input
                  type='checkbox'
                  checked={numbers}
                  onChange={() => setNumbers(!numbers)}
                  className='toggle toggle-primary'
                />
              </div>

              <div className='flex justify-between gap-8 items-center px-4	w-full md:w-8/12 lg:w-6/12'>
                <span className='text-2xl	text-left	subpixel-antialiased font-semibold'>
                  Caracteres especiais
                </span>

                <input
                  type='checkbox'
                  checked={specialCharacters}
                  onChange={() => setSpecialCharacters(!specialCharacters)}
                  className='toggle toggle-primary'
                />
              </div>

              <button
                disabled={!disableSubmit}
                className='btn btn-primary w-11/12 md:w-8/12 lg:w-6/12 mt-5'
                onClick={() => generateRandomString()}
              >
                Gerar Senha
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
