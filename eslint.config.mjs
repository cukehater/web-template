import js from '@eslint/js'
import globals from 'globals'
import eslintConfigPrettier from 'eslint-config-prettier'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'
import unusedImportsPlugin from 'eslint-plugin-unused-imports'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // 1. 무시할 경로 지정 (.eslintignore 대체)
  { ignores: ['dist', '.next'] },

  // 2. JavaScript + TypeScript 추천 규칙
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // 3. TypeScript, React 등 설정 및 규칙
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'simple-import-sort': simpleImportSortPlugin,
      'unused-imports': unusedImportsPlugin,
      'jsx-a11y': jsxA11yPlugin,
      'react-refresh': reactRefresh,
    },
    settings: {
      react: {
        version: 'detect', // React 버전을 자동으로 감지합니다.
      },
    },
    rules: {
      // ✅ 일반 규칙
      'no-console': ['warn', { allow: ['warn', 'error'] }], // console.warn, console.error는 허용
      'prefer-const': 'warn', // 재할당 없는 let은 const로
      'no-nested-ternary': 'warn', // 삼항 연산자 중첩 금지
      'no-unused-vars': 'off', // TypeScript에서는 @typescript-eslint/no-unused-vars 사용
      'no-duplicate-imports': 'warn', // 동일한 모듈에서 중복 import 금지

      // ✅ Import 경로 제한 규칙
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            {
              group: ['../../../*', '../../../../*'],
              message: '깊은 상대 경로 import는 금지됩니다.',
            },
          ],
        },
      ],

      // ✅ TypeScript 규칙
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn', // any 타입 사용 경고
      '@typescript-eslint/naming-convention': [
        'warn',
        // 기본 식별자: camelCase 사용 (예: 변수, 함수 등)
        {
          selector: 'default',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },
        // 변수: camelCase, PascalCase (React 컴포넌트), UPPER_CASE (상수)
        {
          selector: 'variable',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        // 함수: camelCase 또는 PascalCase 허용
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase'],
        },
        // 타입 관련 (interface, type, class, enum 등): PascalCase 필수
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        // enum 멤버: PascalCase 또는 UPPER_CASE 허용
        {
          selector: 'enumMember',
          format: ['PascalCase', 'UPPER_CASE'],
        },
        // 프로퍼티: camelCase, PascalCase (React props 등), UPPER_CASE (상수)
        {
          selector: ['property', 'parameterProperty'],
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        // Import 변수: camelCase 또는 PascalCase, UPPER_CASE(상수) 허용
        {
          selector: 'import',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        // method 변수: camelCase, PascalCase, UPPER_CASE(상수) 허용
        {
          selector: 'method',
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
        },
        // objectLiteralProperty 변수: camelCase, PascalCase, UPPER_CASE(상수) 허용
        {
          selector: 'objectLiteralProperty',
          format: [],
        },
      ],

      // ✅ React JSX 규칙
      ...reactPlugin.configs.flat.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off', // React 17+에서는 import 필요 없음
      'react/jsx-uses-react': 'off', // 동일하게 JSX에서 React 사용 감지 불필요
      'react/jsx-no-undef': 'error', // 정의되지 않은 JSX 요소 사용 시 에러
      'react/jsx-uses-vars': 'warn', // JSX에서 사용된 변수는 unused로 처리하지 않음
      'react/jsx-key': 'warn', // 반복 JSX 요소에 key 필수
      'react/no-array-index-key': 'warn', // key로 index 사용 지양 (불안정한 key)
      'react/jsx-max-props-per-line': [
        'warn',
        { maximum: 1, when: 'multiline' },
      ], // props 한 줄에 하나씩
      'react/no-unescaped-entities': 'warn', // JSX에서 특수문자 직접 입력 금지
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true, // 콜백 함수 props는 마지막
          shorthandFirst: true, // 단축 props 우선 배치
          noSortAlphabetically: false, // 알파벳 정렬 가능
          reservedFirst: true, // key, ref는 맨 앞
        },
      ],
      'react/display-name': 'warn', // 익명 컴포넌트에 이름 지정 유도
      'react/self-closing-comp': 'warn', // 자식 없는 태그는 self-closing 권장
      'react/jsx-handler-names': [
        // 핸들러 네이밍 규칙
        'warn',
        {
          eventHandlerPrefix: 'handle',
          eventHandlerPropPrefix: 'on',
        },
      ],
      'react/jsx-boolean-value': ['warn', 'never'], // boolean props는 value 생략 (ex. <input disabled />)
      'react/jsx-no-useless-fragment': 'warn', // 불필요한 Fragment 제거
      'react/jsx-curly-brace-presence': [
        'warn',
        { props: 'never', children: 'never' },
      ], // 중괄호 최소화

      // ✅ React Hooks 규칙
      'react-hooks/exhaustive-deps': 'warn', // useEffect 의존성 누락 경고
      'react-hooks/rules-of-hooks': 'error', // 훅은 최상위에서만 호출 가능

      // ✅ Import/Export 정렬
      'simple-import-sort/imports': 'warn', // import 순서 정렬
      'simple-import-sort/exports': 'warn', // export 순서 정렬

      // ✅ 미사용 import 제거
      'unused-imports/no-unused-imports': 'warn', // 사용되지 않는 import 제거
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // ✅ JSX 접근성
      'jsx-a11y/alt-text': 'warn', // <img>에는 alt 속성 필수
      'react/button-has-type': 'error', // button 태그에 type 속성 필수

      // ✅ React Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },

  // 4. JS 파일에서는 타입 검사 생략
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
  },

  {
    files: ['vite.config.ts'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.node.json',
      },
    },
  },

  // 5. Prettier 설정: 포맷팅 충돌 방지
  eslintConfigPrettier,
)
